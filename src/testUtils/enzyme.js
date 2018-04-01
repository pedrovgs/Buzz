import Enzyme from "enzyme";
import { createSerializer } from "enzyme-to-json";
import enzymeToJson from "enzyme-to-json";
import Adapter from "enzyme-adapter-react-16";
expect.addSnapshotSerializer(createSerializer({ mode: "deep" }));
Enzyme.configure({ adapter: new Adapter() });

export function shallowComponentToJson(component) {
  return toJson(shallowComponent(component));
}

export function shallowComponent(component) {
  return Enzyme.shallow(component);
}

export function toJson(component) {
  return enzymeToJson(component);
}
