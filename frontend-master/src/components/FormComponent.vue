<template>
  <div>
    <h1 class="text-center mt-3">{{$t('form.title')}}</h1>
    <h5>{{$t('common.select_lang')}}</h5>
    <template>
      <b-button id="lang" v-on:click="setLangUS()">
        <flag iso="us"/>
      </b-button>
      <b-button id="lang" v-on:click="setLangJP()">
        <flag iso="jp"/>
      </b-button>
    </template>
      <b-alert :show="dismissCountDown" dismissible variant="warning" @dismissed="dismissCountDown=0" @dismiss-count-down="countDownChanged">
        {{$t('message.save')}}
      </b-alert>
    <form @submit.prevent="onSubmit" v-if="show" autocomplete="false" name="form" @reset="onReset">
      <div class="form-group row">
        <label for="colFormLabelSm" class="col-sm-2 col-form-label">{{$t('form.input.name')}}</label>
         <div class="col-sm-10">
        <b-form-input class="form-control col-sm-6" name="name" v-model="name" v-validate="{required: true, min:3, max:10, regex:/[^\p{L}\s_]+$/i }" autocomplete="false"></b-form-input>
        <p v-if='errors.has("name")'>{{$t('form.messages.name_required')}}</p>
         </div>
      </div>
      <div class="form-group row">
        <label for="colFormLabelSm" class="col-sm-2 col-form-label">{{$t('form.input.age')}}</label>
         <div class="col-sm-10">
            <b-form-input class="form-control col-sm-6" data-vv-name="age" type="number" v-model="age" v-validate="{required: true}" min="15" max="150" name="age"></b-form-input>
            <p v-if='errors.has("age")'>{{$t('form.messages.age_required')}}</p>
         </div>
      </div>

      <div class="form-group row">
        <label for="colFormLabelSm" class="col-sm-2 col-form-label">{{$t('form.input.comment')}}</label>
         <div class="col-sm-10">
        <b-form-textarea id="textarea1" v-model="comment" name="comment" placeholder="Enter something" :rows="3" :max-rows="6" v-validate="{ required: true}"></b-form-textarea>
        <p v-if='errors.has("comment")'>{{$t('form.messages.comment_required')}}</p>
         </div>
      </div>
      <div class="form-group row">
        <label for="colFormLabelSm" class="col-sm-2 col-form-label"></label>
        <div class="col-sm-5" style="text-align: right">
          <b-button class="btn btn-primary" type="submit" :disabled="errors.any()" v-show="!isLoading">{{$t('form.buttons.add')}}</b-button>
          <button class="btn btn-warning" type="button" v-on:click="addEmp()" disabled v-show="isLoading">
            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            Loading...
          </button>
          <b-button style="margin-right: -10px;" class="btn btn-danger" type="reset" value="Reset">{{$t('form.buttons.cancel')}}</b-button>
        </div>
      </div>
    </form>
    <hr>
    <!--Modal-->
    <b-modal id="modalPreventform" ref="modal"  v-bind:ok-title="$t('dialog.oke')" v-bind:title="$t('dialog.title')" v-bind:cancel-title="$t('dialog.cancel')"  @ok="handleOkform(modalInfo.content,$event,modalInfo.title)"> 
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">name</th>
              <th scope="col">age</th>
              <th scope="col">comment</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row"></th>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
    </b-modal>
  </div>
  
  
</template>

<script lang='ts'>
import { Component, Prop, Vue } from "vue-property-decorator";
import { ValidationObserver } from "vee-validate";
import { State, Getter, Action, Mutation } from "vuex-class";
import { PersonFormState } from "@/store/modules/person/PersonFormState";
import { Person } from "@/models/Person";
import { MyHttpResponse } from "@/models/http/Response";
import { FormResponse } from "@/models/http/FormResponse";
import axios from "axios";
import { __values } from "tslib";
const namespace: string = "personForm";

@Component({
  components: { ValidationObserver }
})
export default class FormComponent extends Vue {
  public show = true;

   /* modal begin */
  public modalInfoForm = { title: "", content: "" };

  public resetModal() {
    this.$root.$emit("bv::hide::modal", "modalInfo");
  }

  public info(item: any, index: any) {
    this.modalInfoForm.title = `${index}`;
    this.modalInfoForm.content = item;
    /* Show modal */
    this.$root.$emit("bv::show::modal", "modalInfo");
  }

  public handleOkform(data: any, evt: any, index: any) {
    /* Delete */
    this.$store.dispatch("deletePerson", [data.id, parseInt(index)]);
    /* Hide modal */
    this.$root.$emit("bv::hide::modal", "modalInfo");
  }
  /* End modal */

  @State(state => state.personForm.isProcessing) public isLoading?: boolean;
  /*  Form */
  public age: number | null = null;
  public comment: string = "";
  get name() {
    return this.$store.state.personForm.form.name;
  }
  set name(val: string) {
    this.$store.commit("setName", val);
  }

  /* Alert */
    private dismissSecs = 2
    private  dismissCountDown = 0

  /* Submit  form */
  public onSubmit() {

    this.$validator.validateAll().then(result => {
      if (result) {
        this.$store.dispatch("save",new Person(this.name,this.age || 15,this.escapeOutput(this.comment)))
          .then(
            (success: FormResponse) => {
              // reset id min */
              this.$store.state.listTable.idMin = this.$store.state.listTable.idMin + 1;
              this.name = "";
              this.age = 0;
              this.comment = "";
              this.$validator.reset();
            },
            (error: MyHttpResponse) => {
            }
          ).finally(()=>{
             this.dismissCountDown = this.dismissSecs
          });
      }
    });
    
  }
  /* Set lang jp */
  public setLangJP() {
    this.$store.dispatch("changeLang", "ja");
  }
  /* Set lang us */
  public setLangUS() {
    this.$store.dispatch("changeLang", "en");
  }

  /* Reset form */
  public onReset(evt: any) {
    evt.preventDefault();
    /* Reset our form values */
    this.name = "";
    this.age = 0;
    this.comment = "";
    /* Trick to reset/clear native browser form validation state */
    this.$validator.reset();
     this.$nextTick(() => {
      this.show = true;
    });
  }

  /* check XSS */
  public escapeOutput(toOutput: any) {
    return toOutput
      .replace(/\&/g, "&amp;")
      .replace(/\</g, "&lt;")
      .replace(/\>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/\'/g, "&#x27")
      .replace(/\//g, "&#x2F");
  }
  /* Alert */

  public countDownChanged (dismissCountDown :any) {
      this.dismissCountDown = dismissCountDown
    }
}
</script>
<style lang="scss">
.pre {
  font-size: 1rem !important;
}
.btn-primary {
  background-color: #007bff !important;
}
@media (min-width: 768px) {
  .input-small {
    width: 60% !important;
  }
}
#lang {
  color: #fff;
  background-color: white !important;
  border-color: #6c757d;
}
</style>