/** @type {UserData} */
let userDataMemory;

/**
 * 사용자 정보를 저장합니다
 * @param {UserData} userData  */
export function setUserDataMemory(userData) {
	userDataMemory = userData;
}

/**
 * 사용자 정보를 반환합니다
 *  @returns {UserData}  */
export function getUserDataMemory() {
	return userDataMemory;
}
