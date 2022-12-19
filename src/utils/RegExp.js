export const idCheck = (id) => {
  // 5~20자의 영문 소문자, 숫자와 특수기호(_),(-)
  let regExp = /^[a-z0-9_\\-]{5,20}$/;

  return regExp.test(id);
};

export const pwCheck = (id) => {
  // 비밀번호 8~16자 영문 대 소문자, 숫자, 특수문자
  let regExp = /^[a-zA-Z\\d`~!@#$%^&*()-_=+]{8,16}$/;

  return regExp.test(id);
};
