'use dom';

import { Application } from '@splinetool/runtime';
import Spline from '@splinetool/react-spline';
export default function DOMComponent({ ...dom }: { dom: import('expo/dom').DOMProps, height: number }) {

  return (
    <div style={{ width: "100%" }}>
      <Spline scene="https://prod.spline.design/de2BW6nSMDSzw5d7-Im5/scene.hanacode" />
    </div>
  );
}
