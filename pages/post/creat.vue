<template>
  <el-row type="flex" class="global">
    <div>
      <div class="title">
        <h2>发表新攻略</h2>
      </div>
      <p>分享你的个人游记，让更多人看到哦！</p>
      <el-input v-model="input" placeholder="请输入标题"></el-input>
      <!-- <template>
        <section class="container">
          <div class="quill-editor" 
              :content="content"
              @change="onEditorChange($event)"
              @blur="onEditorBlur($event)"
              @focus="onEditorFocus($event)"
              @ready="onEditorReady($event)"
              v-quill:myQuillEditor="editorOption">
          </div>
        </section>
      </template> -->

      <div class="location">
        <span>
          输入城市
          <el-row class="demo-autocomplete">
            <el-col :span="30">
              <el-autocomplete
                class="inline-input"
                v-model="state2"
                :fetch-suggestions="querySearch"
                placeholder="搜索城市"
                :trigger-on-focus="false"
                @select="handleSelect"
              ></el-autocomplete>
            </el-col>
          </el-row>
        </span>
      </div>
      <br />
      <el-button type="primary" @click="submitForm('numberValidateForm')">发布</el-button>
      <div class="store">
        <p>
          你也可以保存到
          <el-button type="info" round>草稿箱</el-button>
        </p>
      </div>
    </div>
    <div class="right">
      <h3 style="float:right;top:0;">
        草稿箱
        <el-button type="primary" icon="el-icon-edit" circle></el-button>
      </h3>
    </div>
  </el-row>
</template>

<script>
export default {
  data() {
    
    return {
      input:'',
      content: '<p>I am Example</p>',
        editorOption: {
          // some quill options
          modules: {
            toolbar: [
              ['bold', 'italic', 'underline', 'strike'],
              ['blockquote', 'code-block']
            ]
          }
        },

      // 标题框注册
      restaurants: [],
      state1: "",
      state2: ""
      //   草稿箱注册
    };
  },

  methods: {
    onEditorBlur(editor) {
        console.log('editor blur!', editor)
      },
      onEditorFocus(editor) {
        console.log('editor focus!', editor)
      },
      onEditorReady(editor) {
        console.log('editor ready!', editor)
      },
      onEditorChange({ editor, html, text }) {
        console.log('editor change!', editor, html, text)
        this.content = html
      },

    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    loadAll() {
      return [{ value: "三全鲜食（北新泾店）", address: "长宁区新渔路144号" }];
    },
    handleSelect(item) {
      console.log(item);
    }
  },
  mounted() {
    this.restaurants = this.loadAll();
    console.log('app init, my quill insrance object is:', this.myQuillEditor)
      setTimeout(() => {
        this.content = 'i am changed'
      }, 3000)

  }
};
</script>

<style sonped lang="less">
.global {
  width: 1000px;
  margin: 0 auto;
  padding: 20px 0;
  justify-content: space-between;
  .el-row--flex {
    display: flex;
  }
  h2 {
    font-size: 24px;
    font-weight: 400;
    margin: 10px 0;
  }
  title {
    width: 100%;
    //   display: inline-block;
  }
  p {
    font-size: 12px;
    color: #999;
    margin: 10px 0;
  }
  .el-input {
    width: 50%;
    margin: 20px 0;
  }
  .location {
    display: inline-block;
    span {
      font-family: "STSong";
    }
  }

  .store {
    margin: 20px 0;
    display: inline-block;
    p {
      font-size: 14px;
      color: #000;
      font-family: "STSong";
    }
  }

  div {
    display: block;
  }
}
</style>