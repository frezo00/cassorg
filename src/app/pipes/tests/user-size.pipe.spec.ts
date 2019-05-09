import { UserSizePipe } from '../user-size.pipe';

describe('UserSizePipe', () => {
  it('create an instance', () => {
    const pipe = new UserSizePipe();
    expect(pipe).toBeTruthy();
  });
});
