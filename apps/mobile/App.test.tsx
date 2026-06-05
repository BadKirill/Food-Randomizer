import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';
import * as SecureStore from 'expo-secure-store';
import App from './App';

jest.mock('./src/config/api', () => ({
  API_BASE_URL: 'http://localhost:3000',
  DEFAULT_LOGIN_EMAIL: 'tester@foodrandomizer.app',
}));

jest.mock('expo-secure-store', () => ({
  getItemAsync: jest.fn(),
  setItemAsync: jest.fn(),
  deleteItemAsync: jest.fn(),
}));

const secureStore = SecureStore as jest.Mocked<typeof SecureStore>;

function createJsonResponse(body: unknown, status = 200) {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: async () => body,
  } as Response;
}

describe('Mobile MVP flows', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    secureStore.getItemAsync.mockResolvedValue(null);
    secureStore.setItemAsync.mockResolvedValue(undefined);
    secureStore.deleteItemAsync.mockResolvedValue(undefined);
    global.fetch = jest.fn();
  });

  it('sends authenticated random request with dishType filter when selected', async () => {
    (global.fetch as jest.Mock)
      .mockResolvedValueOnce(
        createJsonResponse({
          token: 'test-session-token',
          user: { id: 'user-1', email: 'tester@foodrandomizer.app' },
          expiresAt: new Date(Date.now() + 3600_000).toISOString(),
        }),
      )
      .mockResolvedValueOnce(createJsonResponse([]))
      .mockResolvedValueOnce(
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

    fireEvent.press(screen.getByText('Manage'));
    fireEvent.changeText(screen.getByPlaceholderText('Password (min 8 chars)'), 'password123');
    fireEvent.press(screen.getByTestId('auth-login-button'));
    await screen.findByText('Logged in: tester@foodrandomizer.app');
    fireEvent.press(screen.getByText('Random'));

    fireEvent.press(screen.getByText('All'));
    fireEvent.press(screen.getByText('Vegan'));
    fireEvent(screen.getByTestId('random-action-button'), 'pressIn');
    fireEvent(screen.getByTestId('random-action-button'), 'pressOut');

    await waitFor(() => expect(screen.getByText('Vegan Bowl')).toBeTruthy());

    const randomCall = (global.fetch as jest.Mock).mock.calls.find((call) => {
      const url = call[0] as string;
      return url.includes('/random/next');
    });
    expect(randomCall).toBeTruthy();
    const [, options] = randomCall;
    expect(options.method).toBe('POST');
    expect(options.headers.Authorization).toBe('Bearer test-session-token');
    expect(options.body).toContain('"dishType":"vegan"');
    expect(options.body).not.toContain('userId');
  });

  it('does not send create request when required fields are empty', async () => {
    render(<App />);

    fireEvent.press(screen.getByText('Manage'));
    expect(screen.getByText('Login or register to open dish management.')).toBeTruthy();
    expect(screen.queryByText('Clear All')).toBeNull();
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('loads selected dish into edit mode and shows Save Changes', async () => {
    (global.fetch as jest.Mock)
      .mockResolvedValueOnce(
        createJsonResponse({
          token: 'test-session-token',
          user: { id: 'user-1', email: 'tester@foodrandomizer.app' },
          expiresAt: new Date(Date.now() + 3600_000).toISOString(),
        }),
      )
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
          createdById: 'user-1',
          createdBy: 'tester@foodrandomizer.app',
          ingredients: [{ name: 'tofu' }],
          steps: ['cook'],
          addOnGroups: [{ groupKey: 'can_add', options: ['sesame'] }],
        }),
      );

    render(<App />);
    fireEvent.press(screen.getByText('Manage'));
    fireEvent.changeText(screen.getByPlaceholderText('Password (min 8 chars)'), 'password123');
    fireEvent.press(screen.getByTestId('auth-login-button'));
    await screen.findByText('Logged in: tester@foodrandomizer.app');
    fireEvent.press(screen.getByText('Dishes List'));

    await waitFor(() => expect(screen.getByText('Dish One')).toBeTruthy());
    fireEvent.press(screen.getByTestId('dish-row-dish-1'));

    expect(await screen.findByText('Edit This Dish')).toBeTruthy();
    fireEvent.press(screen.getByText('Edit This Dish'));

    expect(await screen.findByText('Save Changes')).toBeTruthy();
  });

  it('archives selected dish with DELETE request', async () => {
    (global.fetch as jest.Mock)
      .mockResolvedValueOnce(
        createJsonResponse({
          token: 'test-session-token',
          user: { id: 'user-1', email: 'tester@foodrandomizer.app' },
          expiresAt: new Date(Date.now() + 3600_000).toISOString(),
        }),
      )
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
          createdById: 'user-1',
          createdBy: 'tester@foodrandomizer.app',
          ingredients: [{ name: 'tofu' }],
          steps: ['cook'],
          addOnGroups: [{ groupKey: 'can_add', options: ['sesame'] }],
        }),
      )
      .mockResolvedValueOnce(createJsonResponse({ id: 'dish-1', archivedAt: new Date().toISOString() }))
      .mockResolvedValueOnce(createJsonResponse([]));

    render(<App />);

    fireEvent.press(screen.getByText('Manage'));
    fireEvent.changeText(screen.getByPlaceholderText('Password (min 8 chars)'), 'password123');
    fireEvent.press(screen.getByTestId('auth-login-button'));
    await screen.findByText('Logged in: tester@foodrandomizer.app');
    fireEvent.press(screen.getByText('Dishes List'));
    await waitFor(() => expect(screen.getByText('Dish One')).toBeTruthy());
    fireEvent.press(screen.getByTestId('dish-row-dish-1'));
    expect(await screen.findByText('Archive Dish')).toBeTruthy();

    fireEvent.press(screen.getByTestId('dish-archive-button'));

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
        createJsonResponse({
          token: 'test-session-token',
          user: { id: 'user-1', email: 'tester@foodrandomizer.app' },
          expiresAt: new Date(Date.now() + 3600_000).toISOString(),
        }),
      )
      .mockResolvedValueOnce(createJsonResponse([]))
      .mockResolvedValueOnce(
        createJsonResponse([
          {
            id: 'dish-2',
            name: 'Archived Dish',
            description: 'old',
            dishType: 'vegan',
            createdAt: new Date().toISOString(),
            archivedAt: new Date().toISOString(),
            createdById: 'user-1',
            createdBy: 'tester@foodrandomizer.app',
          },
        ]),
      )
      .mockResolvedValueOnce(createJsonResponse({ id: 'dish-2', archivedAt: null }))
      .mockResolvedValueOnce(createJsonResponse([]));

    render(<App />);
    fireEvent.press(screen.getByText('Manage'));
    fireEvent.changeText(screen.getByPlaceholderText('Password (min 8 chars)'), 'password123');
    fireEvent.press(screen.getByTestId('auth-login-button'));
    await screen.findByText('Logged in: tester@foodrandomizer.app');
    fireEvent.press(screen.getByText('Dishes List'));
    fireEvent.press(screen.getByText('Archived'));

    await waitFor(() => expect(screen.getByText('Archived Dish')).toBeTruthy());
    fireEvent.press(screen.getByTestId('dish-unarchive-dish-2'));

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
