interface RepairRecvType {
	userEmail: string;
	userName: string;
	userAddr: string;
	userNumber: string;
	itemTotal: number;
	userAddrDetail: string;
	items: [
		{
			itemKey: number;
			itemName: string;
			itemSize: string;
			itemPrice: number;
			qty: number;
			pitStatus: boolean;
		},
	];
}
