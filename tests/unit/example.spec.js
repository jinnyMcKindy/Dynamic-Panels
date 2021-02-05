import { createLocalVue, mount } from "@vue/test-utils";
import Bitcoin from "@/components/bitcoins/Bitcoin.vue";
import Vuetify from 'vuetify'

describe("HelloWorld.vue", () => {
  const localVue = createLocalVue()
  let vuetify

  beforeEach(() => {
    vuetify = new Vuetify()
  })
  it("renders props.msg when passed", () => {
    const wrapper = mount(Bitcoin, {
      localVue,
      vuetify,
    })
    expect(wrapper.exists()).toBe(true)
  });
});
