import { autoReply } from '../src/inbox.js';
import { sendLiveChatMessage } from '../src/livechat.js';
import { summarizeThread } from '../src/summarize.js';
import { suggestReply } from '../src/suggest.js';
import { shouldEscalate } from '../src/escalate.js';

describe('autoReply', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('calls the chat API with the ticket content', async () => {
    const ticketContent = 'Customer cannot access their account';
    global.fetch.mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({}),
    });

    await autoReply(ticketContent);

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch.mock.calls[0][0]).toBe('/api/chat-v9');
    expect(global.fetch.mock.calls[0][1].method).toBe('POST');
    expect(JSON.parse(global.fetch.mock.calls[0][1].body).message).toBe(ticketContent);
  });
});

describe('sendLiveChatMessage', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('calls the chat API with the message', async () => {
    const message = 'I need help with my order';
    global.fetch.mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({}),
    });

    await sendLiveChatMessage(message);

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch.mock.calls[0][0]).toBe('/api/chat-v9');
    expect(global.fetch.mock.calls[0][1].method).toBe('POST');
    expect(JSON.parse(global.fetch.mock.calls[0][1].body).message).toBe(message);
  });
});

describe('summarizeThread', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('calls the chat API with the thread', async () => {
    const thread = 'Customer asked about updating their billing details';
    global.fetch.mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({}),
    });

    await summarizeThread(thread);

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch.mock.calls[0][0]).toBe('/api/chat-v9');
    expect(global.fetch.mock.calls[0][1].method).toBe('POST');
    expect(JSON.parse(global.fetch.mock.calls[0][1].body).message).toBe(thread);
  });
});

describe('suggestReply', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('calls the chat API with the context', async () => {
    const context = 'Customer is waiting for a shipping update';
    global.fetch.mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({}),
    });

    await suggestReply(context);

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch.mock.calls[0][0]).toBe('/api/chat-v9');
    expect(global.fetch.mock.calls[0][1].method).toBe('POST');
    expect(JSON.parse(global.fetch.mock.calls[0][1].body).message).toBe(context);
  });
});

describe('shouldEscalate', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('calls the chat API with the ticket content', async () => {
    const ticketContent = 'Customer reports a repeated billing error';
    global.fetch.mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({}),
    });

    await shouldEscalate(ticketContent);

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch.mock.calls[0][0]).toBe('/api/chat-v9');
    expect(global.fetch.mock.calls[0][1].method).toBe('POST');
    expect(JSON.parse(global.fetch.mock.calls[0][1].body).message).toBe(ticketContent);
  });
});
