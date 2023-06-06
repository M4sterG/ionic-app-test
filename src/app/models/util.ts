export const map = { DENT: 'X', SCRATCH: 'Ο', MISSING: 'Δ' };

export const colorMap = { DENT: '--ion-color-success', SCRATCH: '--ion-color-tertiary', MISSING: '--ion-color-danger' };

export const damageMap = {
    'SX-SIDE': 'Lato sinistro',
    'SX-FRONT': 'Lato frontale sinistro',
    'SX-BACK': 'Lato posteriore sinistro',
    'DX-SIDE': 'Lato destro',
    'DX-FRONT': 'Lato frontale destro',
    'DX-BACK': 'Lato posteriore destro',
    'SX-TOP-BACK': 'Tettuccio lato sinistro parte posteriore',
    'DX-TOP-BACK': 'Tettuccio lato destro parte posteriore',
    'SX-TOP-FRONT': 'Tettuccio lato sinistro parte anteriore',
    'DX-TOP-FRONT': 'Tettuccio lato destro parte anteriore',
    'INT-BACK': 'Interno parte posteriore (carico)',
    'INT-FRONT': 'Interno parte anteriore (cabina)',
};

export const positionMap = {
    DOOR: 'Portiera',
    WINDSHIELD: 'Parabrezza',
    WHEEL: 'Ruota',
    WINDOW: 'Vetro',
    HANDLE: 'Maniglia',
    HINGE: 'Cardine portiera',
    SIT: 'Sedile',
    DASHBOARD: 'Cruscotto',
    'CAR-HEADLIGHT': 'Faro',
    'STEERING-WHEEL': 'Volante',
    'CAR-BUMPER': 'Paraurti',
    'ENGINE-HUD': 'Cofano motore',
};

export const typeMap = {
    SCRATCH: 'Graffio',
    DENT: 'Ammaccatura',
    MISSING: 'Mancante',
};

export const actionMap = {
    REPLACE: 'Sostituzione richiesta',
    'HIGH-DAMAGE': 'Danno elevato',
    'MEDIUM-DAMAGE': 'Danno discreto',
    'LOW-DAMAGE': 'Danno lieve',
};
