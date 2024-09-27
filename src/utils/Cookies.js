import { Cookies } from 'react-cookie'

// 생성: setCookie(쿠키 이름, 쿠키에 넣을 값, 옵션)
// 조회: getCookie(쿠키 이름)
// 삭제: removeCookie(쿠키 이름)
const cookies = new Cookies();

export const setCookie = (name, value, options)=>{

	return cookies.set(name, value, {...options})
}

export const getCookie = (name)=>{
	return cookies.get(name)
}

export const removeCookie = (name)=>{
	return cookies.remove(name, { path: '/'})
}