type AuctionState = "AUCTION_CREATE" | "AUCTION_PROGRESS" | "AUCTION_END" | "AUCTION_UNDEFINDE"

type RepairRecvType = {
	auctionId: number;
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

	/** 수선 페이지에서 DB 값 불러올때*/
	repairId: number | undefined
}

type ItemState = {
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

type RepairItemState = {
	myAuction: [{
		state: string;
		auction: RepairRecvType;
	}]
	otherAuction: RepairRecvType[];
	reqestRefrash: boolean;
}

type recvRepairListType = [
	{
		auction: {
			actionData: RepairRecvType;
			state: AuctionState;
		},
		userList: string[];
	}
]

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
	joinDate: string;
};

/** 가격 호가 제시할때 보내는 타입 */
type sendPrice = {
	auctionId: number;
	token: string;
	company: string;
	price: number;
};

/** 경매 실제 state 타입 */
type RecvPriceState = {
	auctionTime: number;
	state: AuctionState;
	price?: number;
	endPrice?: sendPrice;
	actionData: RepairRecvType;
	auctionList: [
		{ token: string; company: string; price: number; time: Date, itemName?: string, isMy: boolean = false},
	];
};

type ErrorPageProps = {
	navigate: string;
	messge: string;
}

type SocketState = {
	state: "connect" | "disconnect" | "close";
	client: import('@stomp/stompjs').Client;
}

type RecvRoomData = {
	state: AuctionState;
	actionData?: RepairRecvType;
	recvPrice?: sendPrice;
}