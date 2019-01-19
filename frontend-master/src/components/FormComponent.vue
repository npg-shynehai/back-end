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
        <b-form-input class="form-control col-sm-6" name="name" v-model="name" v-validate="{required: true, max:10, regex:/[^\p{L}\s_]+$/i }" autocomplete="false"></b-form-input>
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
          <b-button class="btn btn-primary" type="submit" :disabled="(this.name !='' && this.age >=15 && this.age<=150) ? false : true" v-b-modal.modalPreventform v-show="!isLoading">{{$t('form.buttons.add')}}</b-button>
          <button class="btn btn-warning" type="button" v-on:click="addEmp()" disabled v-show="isLoading">
            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            Loading...
          </button>
          <b-button style="margin-right: -10px;" class="btn btn-danger" type="reset" value="Reset">{{$t('form.buttons.cancel')}}</b-button>
        </div>
      </div>
      <!--Modal-->
    <b-modal id="modalPreventform" ref="modal"  v-bind:ok-title="$t('dialog.oke')" v-bind:title="$t('dialog.title')" v-bind:cancel-title="$t('dialog.cancel')"  @ok="handleOkform(view,okshow)"> 
    </b-modal>
    </form>
    <hr>
    
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

  public view = false;
  public okshow = true;

   /* modal begin */
  public modalInfoForm = { title: "", content: "" };

  public resetModal() {
    this.$root.$emit("bv::hide::modal", "modalInfoForm");
  }

  // public infoForm(item: any) {
  //   this.modalInfoForm.title = "Are you want add?";
  //   this.modalInfoForm.content = item;
  //   /* Show modal */
  //   this.$root.$emit("bv::show::modal", "modalInfoForm");
  // }

  public handleOkform(view: boolean,ok: boolean) {
    this.onSubmit(view, ok)
    /* Hide modal */
    this.$root.$emit("bv::hide::modal", "modalInfoForm");
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
  public onSubmit(view:boolean,ok: boolean) {
    if(view)
    {
    this.modalInfoForm.title = "Are you want add?";
    /* Show modal */
    this.$root.$emit("bv::show::modal", "modalInfoForm");
    }
    console.log("view:",view)
    console.log("ok:",ok)
    if(ok)
    {
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