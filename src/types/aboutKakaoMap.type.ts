export type ControlPosition =
  | 'TOP'
  | 'TOPLEFT'
  | 'TOPRIGHT'
  | 'LEFT'
  | 'RIGHT'
  | 'BOTTOM'
  | 'BOTTOMLEFT'
  | 'BOTTOMRIGHT';

type StrokeStyles =
  | 'solid'
  | 'shortdash'
  | 'shortdot'
  | 'shortdashdot'
  | 'shortdashdotdot'
  | 'dot'
  | 'dash'
  | 'dashed'
  | 'dashdot'
  | 'longdash'
  | 'longdashdot'
  | 'longdashdotdot';

export interface LatLng {
  lat: number;
  lng: number;
}

export interface MakeMapArgs {
  containerId: string;
  center: LatLng;
  level: number;
  zoom?: ControlPosition;
  mapType?: ControlPosition;
}

export interface MakePolylineArgs {
  map: any;
  path: LatLng[];
  strokeWeight: number;
  strokeColor: string;
  strokeOpacity: number;
  strokeStyle: StrokeStyles;
}
