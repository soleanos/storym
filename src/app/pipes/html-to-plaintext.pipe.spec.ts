import { HtmlToPlaintextPipe } from './html-to-plaintext.pipe';

describe('HtmlToPlaintextPipe', () => {
  it('create an instance', () => {
    const pipe = new HtmlToPlaintextPipe();
    expect(pipe).toBeTruthy();
  });
});
