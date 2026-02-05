declare module "threejs-components/build/cursors/tubes1.min.js" {
  export default function TubesCursor(
    canvas: HTMLCanvasElement,
    options: {
      tubes: {
        colors: string[];
        lights: {
          intensity: number;
          colors: string[];
        };
      };
    }
  ): {
    tubes: {
      setColors: (colors: string[]) => void;
      setLightsColors: (colors: string[]) => void;
    };
    dispose: () => void;
  };
}
