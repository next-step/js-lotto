import deepFreeze from '../../src/js/utils/deepFreeze.js';

describe('객체 깊은 동결 테스트', () => {
  it('객체의 모든 프로퍼티가 동결된다.', () => {
    const obj = {
      a: 1,
      b: {
        c: 2,
        d: {
          e: 3,
        },
      },
    };

    deepFreeze(obj);

    expect(() => {
      obj.a = null;
      obj.b = null;
      obj.c = null;
      obj.d = null;
      obj.e = null;
      obj.f = null;
    }).toThrow();
    expect(Object.isFrozen(obj)).toBeTruthy();
    expect(obj).toEqual({
      a: 1,
      b: {
        c: 2,
        d: {
          e: 3,
        },
      },
    });
    expect(Object.isFrozen(obj.b)).toBeTruthy();
    expect(obj.b).toEqual({
      c: 2,
      d: {
        e: 3,
      },
    });
    expect(Object.isFrozen(obj.b.d)).toBeTruthy();
    expect(obj.b.d).toEqual({
      e: 3,
    });
    expect(obj.b.d.e).toBe(3);
  });
});
