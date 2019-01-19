<template>
  <div class="container" style="margin-top:20px;">
    <b-table responsive :fixed="fixed" :hover="hover" :items="items" :fields="fields1">
      <template slot="nameage" slot-scope="data">{{data.item.name}} ({{data.item.age}})</template>
      <pre slot="comment" slot-scope="data" v-html="data.value"></pre>
      <template slot="action" slot-scope="props">
        <b-button :disabled="(props.item.age >= 150) ? true : false" class="btn btn-primary btn-sm btn-addold" @click="upAge(props)" >+1</b-button>
        <b-button :disabled="(props.item.age <= 15) ? true : false" class="btn btn-primary btn-sm" @click="downAge(props)">-1</b-button>
        <b-button b-btn v-b-modal.modalPrevent  size="sm"  v-on:click="info(props.item, props.index)"  class="mr-1">{{$t('table.button.delete')}}</b-button>
      </template>
    </b-table>
    <p v-if="isProcessing">Loading...</p>
    <div class="form-group row">
        <label for="colFormLabelSm" class="col-sm-2 col-form-label"></label>
        <div class="col-sm-5" style="text-align: right">
          <b-button  :disabled="isDisabled" style="margin-right: -10px;" class="btn btn-warning" v-show="!isMore"  v-on:click="morePerson($event)" >{{$t('button.more')}}</b-button>
        </div>
      </div>
    <!--Modal-->
    <b-modal id="modalPrevent" ref="modal" v-bind:ok-title="$t('dialog.oke')" v-bind:title="$t('dialog.title')" v-bind:cancel-title="$t('dialog.cancel')"  @ok="handleOk(modalInfo.content,$event,modalInfo.title)"> 
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">{{$t('form.input.name')}}</th>
              <th scope="col">{{$t('form.input.age')}}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>{{ modalInfo.content.name }}</td>
              <td>{{ modalInfo.content.age }}</td>
            </tr>
          </tbody>
        </table>
    </b-modal>
  </div>
</template>

<script lang='ts'>
import { PersonService } from "@/services/PersonService";
import { State, Getter, Action, Mutation } from "vuex-class";
import { Component, Prop, Vue } from "vue-property-decorator";
import { FormResponse } from "@/models/http/FormResponse";
import { MyHttpResponse } from "@/models/http/Response";
import index from "@/store";
import i18n from "@/i18n";

@Component
export default class ListTableComponent extends Vue {

  @State(state => state.listTable.isMore) public isMore?: boolean;
  /* Init đối tượng service */
  public personService = new PersonService();

  /* modal begin */
  public modalInfo = { title: "", content: "" };

  public resetModal() {
    this.$root.$emit("bv::hide::modal", "modalInfo");
  }

  public info(item: any, index: any) {
    this.modalInfo.title = `${index}`;
    this.modalInfo.content = item;
    /* Show modal */
    this.$root.$emit("bv::show::modal", "modalInfo");
  }

  public handleOk(data: any, evt: any, index: any) {
    /* Delete */
    this.$store.dispatch("deletePerson", [data.id, parseInt(index)]);
    /* Hide modal */
    this.$root.$emit("bv::hide::modal", "modalInfo");
  }
  /* End modal */

  /* get item cho table */
  get items() {
    /* Lấy page hiện tai */
    this.currentPage = this.$store.state.listTable.currentPage;

    /* Lấy id nhỏ nhất trong table */
    this.idMin = this.$store.state.listTable.idMin;
 
    /* Lấy max page */
    this.maxPage = this.$store.state.listTable.totalPage;

    /* Lấy data cho table */
    return this.$store.state.listTable.items;
  }
  /* setting trạng thái cho state */
  get isProcessing() {
    return this.$store.state.listTable.isProcessing;
  }

  /* Trạng thái state */
  public saveStatue: boolean | null = null;

  public saveMessage: string = "";

  /* Setting header table */
  public fields1 = [
    { key: "nameage", label: '' },
    { key: "comment", label: '' },
    { key: "action", label: '', class: "colum-age" }
  ];
  /* Setting table lúc hover vào rows */
  private hover = true;

  /* Auto fix  reponsive table */
  private fixed = true;

  /* Trang hiên tai */
  private currentPage = 0;

  /* Id Min nhỏ nhất */
  private idMin = 1;

  /* số lượng page tối đa */
  private maxPage = 0;

  /* Chỉ số của row chọn */
  private index = 0;

  /* Trạng thái của button */
  private isDisabled = false;

  /* Init table => dổ dữ liệu vào table */
  public mounted() {
    this.$store.dispatch("init");
  }

  /* Method update age+ with id */
  public upAge(data: any) {
    console.log(data.item.age)
    
    if (parseInt(data.item.age) < 150) {
      this.$store.dispatch("upAge", [data.item.id, data.index,]);
    }else
    {
      alert("Age requie < 150");
    }
  }

  /* Method update age- with id */
  public downAge(data: any) {
    if (parseInt(data.item.age) > 15) {
      this.$store.dispatch("downAge", [data.item.id, data.index]);
    }else
    {
      alert("Age requie > 15");

    }
  }

  /* get more data with id ang page */
  public morePerson(event: any) {
    event.preventDefault();
    this.$store.dispatch("morePerson", this.idMin);
  }
}
</script>
<style lang="scss">
table {
  text-align: center;
}
.btn-secondary {
  margin-right: 20px;
}
.btn-addold {
  margin-left: 30px;
}

@media (min-width: 1200) {
  .colum-age {
    width: 15%;
  }
  .action {
    width: 15%;
  }
}
.table-responsive thead th {
    vertical-align: bottom;
}
.table-responsive thead tr th{
border-top: 0px solid #dee2e6 !important; 
}
.table-responsive thead th{
  border-bottom: 0px !important;
}
.table-responsive tbody tr:first-child td{
  border-top:none !important;
}
.table-responsive thead{
  display: none;
}
.table-responsive:hover{
  overflow-y: scroll;
}
.table-responsive{
  height: 400px;
  margin-bottom: 50px;
  overflow: hidden;
}
  pre {
  white-space: pre-wrap;       /* css-3 */
  white-space: -moz-pre-wrap;  /* Mozilla, since 1999 */
  white-space: -pre-wrap;      /* Opera 4-6 */
  white-space: -o-pre-wrap;    /* Opera 7 */
  word-wrap: break-word;       /* Internet Explorer 5.5+ */
  font-family: 'Avenir', Helvetica, Arial, sans-serif ,'ＭＳ Ｐ明朝'!important;
  -webkit-font-smoothing: antialiased;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  }
  .modal-footer {
    flex-direction: row-reverse;
    justify-content: space-around;
    display: flex;
    justify-content: flex-start!important;
}

.modal-footer .btn-secondary{
margin-left: 10px;
}
</style>

