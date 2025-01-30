export interface IAlert {
	active: boolean;
	text: string;
}

export interface IAlertStore {
	dangerAlert: IAlert;
	infoAlert: IAlert;
	successAlert: IAlert;
	warningAlert: IAlert;
}
