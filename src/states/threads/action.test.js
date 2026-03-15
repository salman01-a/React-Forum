import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import api from '../../utils/api';
import { asyncAddThread, addThreadActionCreator } from './action';

const fakeThreadResponse = {
  id: 'thread-1',
  title: 'Thread Test',
  body: 'Ini body test',
  category: 'test',
  createdAt: '2026-03-14T00:00:00.000Z',
  ownerId: 'user-1',
  upVotesBy: [],
  downVotesBy: [],
  totalComments: 0,
};

const fakeErrorResponse = new Error('Ups, something went wrong');

describe('asyncAddThread thunk', () => {
  beforeEach(() => {
    api._createThread = api.createThread;
  });

  afterEach(() => {
    api.createThread = api._createThread;
    delete api._createThread;
  });

  it('should dispatch action correctly when data fetching success', async () => {
    api.createThread = () => Promise.resolve(fakeThreadResponse);
    const dispatch = vi.fn();

    await asyncAddThread({ title: 'Thread Test', body: 'Ini body test', category: 'test' })(dispatch);

    expect(dispatch).toHaveBeenCalledWith(addThreadActionCreator(fakeThreadResponse));
  });

  it('should call alert correctly when data fetching failed', async () => {
    api.createThread = () => Promise.reject(fakeErrorResponse);
    const dispatch = vi.fn();
    global.alert = vi.fn();

    await asyncAddThread({ title: 'Thread Test', body: 'Ini body test', category: 'test' })(dispatch);


    expect(global.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});