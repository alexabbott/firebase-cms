import { GetUserPipe } from './getUser.pipe';

describe('GetUserPipe', () => {
  it('create an instance', () => {
    const pipe = new GetUserPipe();
    expect(pipe).toBeTruthy();
  });
});
