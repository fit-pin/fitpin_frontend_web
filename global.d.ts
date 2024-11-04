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
			/**추후 state 쪽에서 */
			itemImageUrl: string | undefined;
			/**추후 state 쪽에서 */
			fitPrice: number | undefined;
			itemSize: string;
			itemPrice: number;
			qty: number;
			pitStatus: boolean;
		},
	];
}