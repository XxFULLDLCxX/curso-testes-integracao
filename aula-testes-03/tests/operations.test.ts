import calculator from 'calculator';

describe('operations check', () => {
  it('sum', () => {
    expect(calculator.sum(2, 1)).toEqual(3);
  });
  it('sub', () => {
    expect(calculator.sub(2, 1)).toEqual(1);
  });
  it('div', () => {
    expect(calculator.div(1, 2)).toEqual(0.5);
  });
  it('mul', () => {
    expect(calculator.mul(2, 1)).toEqual(2);
  });
});
