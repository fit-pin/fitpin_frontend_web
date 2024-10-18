/**  데이터 백엔드에 get 요청을 보냅니다.
 * @param {str} url 요청주소
 * @returns 응답 json
 * @example
 * // async, await 방식
 * async function any() {
 *   const data = await reqGet('url');
 *   console.log(data.아무개);
 * }
 * // callback 방식
 * reqGet('url')
 *  .then(data => console.log(data.아무개))
 *  .catch(err => console.log(err));
 */
export async function reqGet(url) {
    const res = await fetch(url, {
        headers: {
            Accept: "application/json",
        },
    });

    return await res.json();
}

/** 데이터 백엔드에 post 요청을 보냅니다.
 * @param {str} url 요청주소
 * @param {object} body 요청 js객체
 * @returns 응답 json
 * @example
 * // async, await 방식
 * async function any() {
 *   const data = await reqGet('url', {키: '값'});
 *   console.log(data.아무개);
 * }
 * // callback 방식
 * reqGet('url', {키: '값'})
 *  .then(data => console.log(data.아무개))
 *  .catch(err => console.log(err));
 */
export async function reqPost(url, body) {
    const res = await fetch(url, {
        method: "post",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });

    return await res.json();
}

/** 파일 업로드 API 를 호출합니다
 * @param {string} url 요청주소
 * @param {FormData} formData FormData (하단 예제 참고 바람)
 * @returns {Promise<any>} 응답 json
 * @example
 * // FormData 예제
 * const formData = new FormData();
 * // 일반 데이터
 * formData.append('form-data 키값', '값');
 *
 * // async, await 방식
 * async function any() {
 *   const data = await reqFileUpload('url', formData);
 *   console.log(data.아무개);
 * }
 * // callback 방식
 * reqFileUpload('url', formData)
 *  .then(data => console.log(data.아무개))
 *  .catch(err => console.log(err));
 */
export async function reqFileUpload(url, formData) {
    const res = await fetch(url, {
        method: "post",
        headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
        },
        body: formData,
    });

    return await res.json();
}
