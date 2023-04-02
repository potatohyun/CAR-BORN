import { takeEvery, takeLatest } from "redux-saga/effects";
import {
  LOGIN_REQUEST,
  LOGOUT_REQUEST,
  takeLoginSaga,
  takeLogoutSaga,
} from "../takeLoginLogoutModule";
import { GetAgreementSaga, GET_TERMSOFUSE } from "../getAgreementModule";

import {
  CompanyIdCheckSaga,
  COMPANYID_CHECK,
  UserIdCheckSaga,
  USERID_CHECK,
} from "../UserIdCheckModule";
import {
  passwordResetCheckSaga,
  PASSWORD_RESET_CHECK,
} from "../PasswordCheckModule";
import { newPasswordSaga, NEWPASSWORD_REQUEST } from "../newPasswordModule";
import { searchidCheckSaga, SEARCHID_CHECK } from "../searchidModule";
import {
  companyverificationNumberSaga,
  COMPANY_VERIFICATION_CHECK_REQUEST,
  userSmsAuthSaga,
  userverificationNumberSaga,
  USER_SMS_AUTH_ACTION,
  USER_VERIFICATION_CHECK_REQUEST,
  COMPANY_SMS_AUTH_ACTION,
  companySmsAuthSaga
} from "../verificationNumberModule";
import {
  createInspectorReviewSaga,
  createRepairReviewSaga,
  CREATE_INSPECTOR_REVIEW_REQUEST,
  CREATE_REPAIR_REVIEW_REQUEST,
} from "./../createReviewModule";
import { userinfoDeleteSaga, USERINFO_DELETE } from "./../userInfoDeleteModule";
import {
  companyinfoDeleteSaga,
  COMPANYINFO_DELETE,
} from "./../companyInfoDeleteModule";
import {
  companyModifyPasswordSaga,
  COMPANY_MODIFY_PASSWORD_REQUEST,
  userModifyPasswordSaga,
  USER_MODIFY_PASSWORD_REQUEST,
} from "./../modifyPasswordModule";



export default function* rootSaga() {
  yield takeEvery(LOGIN_REQUEST, takeLoginSaga);
  yield takeLatest(LOGOUT_REQUEST, takeLogoutSaga);
  yield takeEvery(GET_TERMSOFUSE, GetAgreementSaga);
  yield takeLatest(USERID_CHECK, UserIdCheckSaga);
  yield takeLatest(COMPANYID_CHECK, CompanyIdCheckSaga);
  yield takeLatest(SEARCHID_CHECK, searchidCheckSaga);

  yield takeEvery(USER_VERIFICATION_CHECK_REQUEST, userverificationNumberSaga);
  yield takeEvery(
    COMPANY_VERIFICATION_CHECK_REQUEST,
    companyverificationNumberSaga
  );
  yield takeLatest(PASSWORD_RESET_CHECK, passwordResetCheckSaga);
  yield takeLatest(NEWPASSWORD_REQUEST, newPasswordSaga);
  yield takeLatest(CREATE_INSPECTOR_REVIEW_REQUEST, createInspectorReviewSaga);
  yield takeLatest(CREATE_REPAIR_REVIEW_REQUEST, createRepairReviewSaga);
  yield takeLatest(USERINFO_DELETE, userinfoDeleteSaga);
  yield takeLatest(COMPANYINFO_DELETE, companyinfoDeleteSaga);
  yield takeLatest(USER_MODIFY_PASSWORD_REQUEST, userModifyPasswordSaga);
  yield takeLatest(COMPANY_MODIFY_PASSWORD_REQUEST, companyModifyPasswordSaga);
  yield takeLatest(USER_SMS_AUTH_ACTION, userSmsAuthSaga);
  yield takeLatest(COMPANY_SMS_AUTH_ACTION, companySmsAuthSaga);
}
