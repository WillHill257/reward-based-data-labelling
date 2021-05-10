import { shallowMount, mount } from "@vue/test-utils";

import CreateJob from "@/components/CreateJob/CreateJob.vue";
import Vue from "vue";
import Vuetify from "vuetify";
const vuetify = new Vuetify();

Vue.use(Vuetify);

//Does the component appear on screen onLoad
describe("Upload labels", () => { 
  describe("When loaded", () => {
    test("should have all the necessary UI elements", () => {
        const wrapper = shallowMount(CreateJob, {vuetify});

        expect(wrapper.isVueInstance()).toBeTruthy();
        expect(wrapper.find("#label-input").exists()).toBe(true);
    });
  });
});

//If you enter something and press enter does it make pills
describe("Enter functionality of component", () => {
    describe("When loaded", () => {
        //test test
        it('Enter text and check the value of inputText', ()=>{
            const wrapper:any = shallowMount(CreateJob, {vuetify})
            const textInput = wrapper.find("#label-input")
            textInput.setData({inputText: "a"})
            expect(wrapper.vm.inputText).toBe("a")
        })

        //if the contents of the textbox one value does it make 1 pill
        it('One value entered, enter key pressed, it creates a pill', async () => {
            const wrapper:any = shallowMount(CreateJob, {vuetify})
            const value = "a"
            //wrapper.setData({labelData: value})

            const labelInput = wrapper.find("#label-input")
            labelInput.setData(value)
            //await wrapper.trigger('keydown', {keyCode:13})
            labelInput.trigger('keydown', {keyCode:13})
            const expectedLength = value.split(",").length
            //expect(wrapper.findAll(".pill").length).toBe(expectedLength)
            expect(wrapper.vm.labelArray.length).toBe(expectedLength)
        })

        //if the contents of the textbox is comma separated (by n-1 commas) does it make n pills
        it('Many comma separated values entered, enter key pressed, it n pills', async () => {
            const wrapper = shallowMount(CreateJob, {vuetify});

            const value = "a, b, c"
            await wrapper.find("#label-input").setData({value: value})
            await wrapper.trigger('keydown.enter')
            const expectedLength = value.split(",").length
            expect(wrapper.findAll(".pill").length).toBe(expectedLength)
        })

        //if the contents of the textbox contains two commas in a row ",," it should not enter an empty element in the array
        it('Should n,, creates 0 pills', async () => {
            const wrapper = shallowMount(CreateJob, {vuetify});

            const value = ",,"
            await wrapper.find("#label-input").setData({value: value})
            await wrapper.trigger('keydown.enter')
            const expectedLength = 0
            //TODO cancel out the empty ones
            expect(wrapper.findAll(".pill").length).toBe(expectedLength)
        })

        //if the contents of the textbox contains two commas separated by a space ", ," it should not enter a space in the array
        it(', , creates 0 pills', async () => {
            const wrapper = shallowMount(CreateJob, {vuetify});

            const value = ", ,"
            await wrapper.find("#label-input").setData({value: value})
            await wrapper.trigger('keydown.enter')
            const expectedLength = 0
            //TODO cancel out the empty ones
            expect(wrapper.findAll(".pill").length).toBe(expectedLength)
        })

        //if the user chooses to remove a pill it should also be removed from the array
        //

        //if the user presses enter when the text box is empty or contains a space no array element is added
        it('nothing entered, nothing saved', async () => {
            const wrapper = shallowMount(CreateJob, {vuetify});

            const value = ""
            await wrapper.find("#label-input").setData({value: value})
            await wrapper.trigger('keydown.enter')
            const expectedLength = 0
            expect(wrapper.findAll(".pill").length).toBe(expectedLength)
        })

        //if a user presses submit without any elements in the array it complains - ?
        //
    });
    
    //if you press submit does it behave appropriately
    describe("submit buttn sends array to DB", () => {
        
        //TODO
        it('Items in array', async () => {
            const wrapper = shallowMount(CreateJob, {vuetify});

            const value = ""
            await wrapper.find("#label-input").setData({value: value})
            await wrapper.trigger('keydown.enter')
            const expectedLength = 0
            expect(wrapper.findAll(".pill").length).toBe(expectedLength)
        })

        //TODO
        it('No items in array', async () => {
            const wrapper = shallowMount(CreateJob, {vuetify});

            const value = ""
            await wrapper.find("#label-input").setData({value: value})
            await wrapper.trigger('keydown.enter')
            const expectedLength = 0
            expect(wrapper.findAll(".pill").length).toBe(expectedLength)
        })
      });

  });


    
