import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';
import App from './App';

jest.mock('./src/config/api', () => ({
  API_BASE_URL: 'http://localhost:3000',
  DISHES_WRITE_TOKEN: 'test-mobile-write-token',
}));

function createJsonResponse(body: unknown, status = 200) {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: async () => body,
  } as Response;
}

describe('Mobile MVP flows', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    global.fetch = jest.fn();
  });

  it('sends random request with dishType filter when selected', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce(
      createJsonResponse({
        dish: {
          id: 'd1',
          name: 'Vegan Bowl',
          description: 'desc',
          dishType: 'vegan',
          ingredients: [{ name: 'tofu' }],
          steps: ['cook'],
          addOnGroups: [{ groupKey: 'can_add', options: ['sesame'], selected: 'sesame' }],
        },
        selectionMeta: {
          cooldownApplied: 4,
          fallbackRelaxationUsed: false,
        },
      }),
    );

    render(<App />);

    fireEvent.press(screen.getByText('Vegan'));
    fireEvent.press(screen.getByText('Pick Random Dish'));

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    const [, options] = (global.fetch as jest.Mock).mock.calls[0];
    expect(options.method).toBe('POST');
    expect(options.body).toContain('"dishType":"vegan"');
  });

  it('does not send create request when required fields are empty', async () => {
    render(<App />);

    fireEvent.press(screen.getByText('Manage Dishes'));
    fireEvent.press(screen.getByText('Save Dish'));
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('loads selected dish into edit mode and shows Save Changes', async () => {
    (global.fetch as jest.Mock)
      .mockResolvedValueOnce(
        createJsonResponse([
          {
            id: 'dish-1',
            name: 'Dish One',
            description: 'd',
            dishType: 'vegan',
            createdAt: new Date().toISOString(),
          },
        ]),
      )
      .mockResolvedValueOnce(
        createJsonResponse({
          id: 'dish-1',
          name: 'Dish One',
          description: 'd',
          dishType: 'vegan',
          ingredients: [{ name: 'tofu' }],
          steps: ['cook'],
          addOnGroups: [{ groupKey: 'can_add', options: ['sesame'] }],
        }),
      );

    render(<App />);
    fireEvent.press(screen.getByText('Manage Dishes'));
    fireEvent.press(screen.getByText('Refresh List'));

    expect(await screen.findByText('Dish One')).toBeTruthy();
    fireEvent.press(screen.getByText('Dish One'));

    expect(await screen.findByText('Edit This Dish')).toBeTruthy();
    fireEvent.press(screen.getByText('Edit This Dish'));

    expect(await screen.findByText('Save Changes')).toBeTruthy();
  });

  it('archives selected dish with DELETE request', async () => {
    (global.fetch as jest.Mock)
      .mockResolvedValueOnce(
        createJsonResponse([
          {
            id: 'dish-1',
            name: 'Dish One',
            description: 'd',
            dishType: 'vegan',
            createdAt: new Date().toISOString(),
          },
        ]),
      )
      .mockResolvedValueOnce(
        createJsonResponse({
          id: 'dish-1',
          name: 'Dish One',
          description: 'd',
          dishType: 'vegan',
          ingredients: [{ name: 'tofu' }],
          steps: ['cook'],
          addOnGroups: [{ groupKey: 'can_add', options: ['sesame'] }],
        }),
      )
      .mockResolvedValueOnce(createJsonResponse({ id: 'dish-1', archivedAt: new Date().toISOString() }))
      .mockResolvedValueOnce(createJsonResponse([]));

    render(<App />);

    fireEvent.press(screen.getByText('Manage Dishes'));
    fireEvent.press(screen.getByText('Refresh List'));
    expect(await screen.findByText('Dish One')).toBeTruthy();

    fireEvent.press(screen.getByText('Dish One'));
    expect(await screen.findByText('Archive Dish')).toBeTruthy();

    fireEvent.press(screen.getByText('Archive Dish'));

    await waitFor(() => {
      const deleteCall = (global.fetch as jest.Mock).mock.calls.find((call) => {
        const options = call[1] as { method?: string } | undefined;
        return options?.method === 'DELETE';
      });
      expect(deleteCall).toBeTruthy();
    });
  });

  it('loads archived dishes and unarchives from list', async () => {
    (global.fetch as jest.Mock)
      .mockResolvedValueOnce(
        createJsonResponse([
          {
            id: 'dish-2',
            name: 'Archived Dish',
            description: 'old',
            dishType: 'vegan',
            createdAt: new Date().toISOString(),
            archivedAt: new Date().toISOString(),
          },
        ]),
      )
      .mockResolvedValueOnce(createJsonResponse({ id: 'dish-2', archivedAt: null }))
      .mockResolvedValueOnce(
        createJsonResponse([
          {
            id: 'dish-2',
            name: 'Archived Dish',
            description: 'old',
            dishType: 'vegan',
            createdAt: new Date().toISOString(),
            archivedAt: new Date().toISOString(),
          },
        ]),
      );

    render(<App />);
    fireEvent.press(screen.getByText('Manage Dishes'));
    fireEvent.press(screen.getByText('Archived'));

    expect(await screen.findByText('Archived Dish')).toBeTruthy();
    fireEvent.press(screen.getByText('Unarchive'));

    await waitFor(() => {
      const postCall = (global.fetch as jest.Mock).mock.calls.find((call) => {
        const url = call[0] as string;
        const options = call[1] as { method?: string } | undefined;
        return url.includes('/dishes/dish-2/unarchive') && options?.method === 'POST';
      });
      expect(postCall).toBeTruthy();
    });
  });
});
