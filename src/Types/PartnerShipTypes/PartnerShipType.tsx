export interface PartnerShipType {
    id: string;
    name: string;
    created_at: string;
    updated_at: string;
}

export interface InitialStatePartnerShipType{
    partnerShipData: PartnerShipType[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    filterToggle: boolean;
    loading: boolean;
    error: string | null;
    isOpenModalCreatePartnerShip: boolean;
    isOpenModalEditPartnerShip: boolean;
    isOpenModalDeletePartnerShip: boolean;
    selectedPartnerShip: PartnerShipType | null;
    navId: number;
    tabId: number;
    formValues: any;
}

export interface CreatePartnerShipType {
    name: string;
}

export interface StaticModalToggleProp {
    staticModalToggle: boolean;
}

export interface PartnerShipListContainerProps extends PartnerShipType {}