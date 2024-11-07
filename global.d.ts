type RepairRecvType = [
	{
		auctionId: string;
		userEmail: string;
		userName: string;
		userAddr: string;
		userAddrDetail: string;
		userNumber: string;
		itemTotal: number;
		itemKey: number;
		itemName: string;
		itemSize: string;
		itemPrice: number;
		pitPrice: number;
		qty: 1;
		pitStatus: boolean;

		pitItemOrder: {
			itemType: string;
			itemSize: string;
			itemHeight: number | null;
			itemShoulder: number | null;
			itemChest: number | null;
			itemSleeve: number | null;
			frontrise: number | null;
			itemWaists: number | null;
			itemThighs: number | null;
			itemHemWidth: number | null;
			itemhipWidth: number | null;
		} | null;

		/**추후 state 쪽에서 */
		itemImageUrl: string | undefined;
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
};
