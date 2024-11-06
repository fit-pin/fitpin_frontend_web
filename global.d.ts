
type RepairRecvType = [
	{
		auctionId: string;
		userEmail: string;
		userName: string;
		userAddr: string;
		userNumber: string;
		itemTotal: string;
		userAddrDetail: string;
		itemKey: number;
		itemName: string;
		itemSize: string;
		itemPrice: number;
		qty: 1;
		pitStatus: boolean;
		/**추후 state 쪽에서 */
		itemImageUrl: string | undefined;
		/**추후 state 쪽에서 */
		fitPrice: number | undefined;
	},
];

/** 수선 업체 화면 로그인 정보 */
type UserData = {
	id: number;
	company: string;
	username: string;
	password: string;
	zipcode: string;
	address1: string;
	address2: string;
	phone: string;
	role: string;
}
