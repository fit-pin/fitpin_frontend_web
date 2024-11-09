type AuctionState = "AUCTION_CREATE" | "AUCTION_PROGRESS" | "AUCTION_END" | "AUCTION_UNDEFINDE" | "AUCTION_UNDEFINDE"
    
type RepairRecvType = {
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
	}

	/**추후 state 쪽에서 */
	itemImageUrl: string | undefined;

	/**추후 경메 쪽에서 */
	originItem: {
		itemHeight: number | null;
		itemShoulder: number | null;
		itemChest: number | null;
		itemSleeve: number | null;
		frontrise: number | null;
		itemWaists: number | null;
		itemThighs: number | null;
		itemHemWidth: number | null;
		itemhipWidth: number | null;
	} | undefined;
}


type RepairItemState = {
	myAuction: {
		state: string;
		auction: RepairRecvType[]
	}
	otherAuction: RepairRecvType[]
}

type recvRepairListType = [
	{
		auction: {
			actionData: RepairRecvType[],
			state: AuctionState
		},
		userList: {}
	}
]

/** 수선 업체 화면 로그인 정보 */
type UserData = {
	onMemory: boolean;
	userData: {
		id: number;
		company: string;
		username: string;
		password: string;
		zipcode: string;
		address1: string;
		address2: string;
		phone: string;
		role: string;
		joinDate: string
	}
};

/** 가격 호가 제시할때 보내는 타입 */
type sendPrice = {
	token: string;
	company: string;
	price: number;
};

/** 경매 실제 state 타입 */
type RecvPriceState = {
	auctionTime: number;
	price?: number;
	auctionList: [
		{ token: string; company: string; price: number; time: Date, itemName?: string, isMy: boolean = false},
	];
};

type ErrorPageProps = {
	navigate: string;
	messge: string;
}