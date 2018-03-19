import Enzyme from "enzyme";
import { createSerializer } from "enzyme-to-json";
import toJson from "enzyme-to-json";
import Adapter from "enzyme-adapter-react-16";
expect.addSnapshotSerializer(createSerializer({ mode: "deep" }));
Enzyme.configure({ adapter: new Adapter() });

export function shallowComponent(component) {
  return toJson(Enzyme.shallow(component));
}
