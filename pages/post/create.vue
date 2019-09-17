<template>
  <div class="create">
    <el-row type="flex" justify="space-between">
      <el-col :span="18">
        <h2>发表新攻略</h2>
        <p>分享你的个人游记，让更多人看到哦！</p>
        <el-input v-model="addInfo.title" placeholder="请输入标题" style="margin-bottom:20px;"></el-input>
        <el-row>
          <template>
            <div id="app">
              <VueEditor :config="config" ref="vueEditor" />
            </div>
          </template>
        </el-row>
        <el-row style="margin:20px 0">
          <span style="font-weight:400;">选择城市</span>
          <el-autocomplete
            style="width:210px;margin-left:15px;"
            v-model="addInfo.city"
            :fetch-suggestions="querySearchAsync"
            placeholder="请搜索游玩城市"
            @select="handleSelect"
          ></el-autocomplete>
        </el-row>
        <el-row style="margin-top:20px">
          <el-button type="primary" size="small" @click="release">发布</el-button>
          <span class="save">
            或者
            <a href="javascript:;" @click="saveDraft">保存到草稿</a>
          </span>
        </el-row>
      </el-col>
      <el-col :span="6">
        <div class="draftBox fr">
          <h4>草稿箱（{{drafts.length}}）</h4>
          <div
            class="draft-post-title"
            v-for="(item,index) in drafts"
            :key="index"
            @click="draftCallback(item)"
          >
            <span>
              {{item.title}}
              <i class="el-icon-edit"></i>
            </span>
            <p>{{item.time}}</p>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import moment from "moment";
// import VueEditor from "vue-word-editor";
// 需要单独引入样式
import "quill/dist/quill.snow.css";
let VueEditor;

if (process.browser) {
  VueEditor = require("vue-word-editor").default;
}
export default {
  name: "app",
  data() {
    return {
      addInfo: 
        {
          title: "",
          city: "",
          content: "",
          time: ""
        }
      ,
      drafts:[],
      config: {
        modules: {
          // 工具栏
          toolbar: [
            ["bold", "italic", "underline", "strike"], // toggled buttons
            ["blockquote", "code-block"],
            ["image", "video"],

            [
              {
                header: 1
              },
              {
                header: 2
              }
            ], // custom button values
            [
              {
                list: "ordered"
              },
              {
                list: "bullet"
              }
            ],
            [
              {
                script: "sub"
              },
              {
                script: "super"
              }
            ], // superscript/subscript
            [
              {
                indent: "-1"
              },
              {
                indent: "+1"
              }
            ], // outdent/indent
            [
              {
                direction: "rtl"
              }
            ] // text direction
          ]
        },
        // 主题
        theme: "snow",
        uploadImage: {
          url: "http://localhost:1337/upload",
          name: "files",
          uploadBefore(file) {
            return true;
          },
          uploadProgress(res) {},
          uploadSuccess(res, insert) {
            insert("http://localhost:1337" + res.data[0].url);
          },
          uploadError() {},
          showProgress: false
        },

        uploadVideo: {
          //url: "http://157.122.54.189:9095/upload",
          url: "http://localhost:1337/upload",
          name: "files",
          uploadBefore(file) {
            return true;
          },
          uploadProgress(res) {},
          uploadSuccess(res, insert) {
            insert("http://localhost:1337" + res.data[0].url);
          },
          uploadError() {}
        }
      }
    };
  },
  components: {
    VueEditor
  },
  mounted(){
    this.drafts=JSON.parse(localStorage.getItem("draftsData")) || []
  },
  methods: {
    // 点击草稿箱将数据返回到编辑区域
    draftCallback(value){
      const {...addInfo1}=value
      // console.log(addInfo1)
      this.addInfo=addInfo1
      this.$refs.vueEditor.editor.root.innerHTML =addInfo1.content;
    },
    // 保存到草稿箱
    saveDraft() {
      this.addInfo.content = this.$refs.vueEditor.editor.root.innerHTML;
      this.addInfo.time = moment(new Date()).format("YYYY-MM-DD");
      this.drafts.push(this.addInfo)
      localStorage.setItem('draftsData',JSON.stringify(this.drafts))
      // console.log(this.drafts);
      this.$refs.vueEditor.editor.root.innerHTML = "";
      this.addInfo = {};
    },
    // 点击发布
    release() {
      this.addInfo.content = this.$refs.vueEditor.editor.root.innerHTML;
      this.addInfo.time = moment(new Date()).format("YYYY-MM-DD");
      // console.log(this.addInfo);
      this.$axios({
        url: "/posts",
        method: "post",
        data: {
          title: this.addInfo.title,
          city: this.addInfo.city,
          content: this.addInfo.content
        },
        headers: {
          Authorization: `Bearer ${this.$store.state.user.userInfo.token}`
        }
      }).then(res => {
        // console.log(res);
        this.$message.success(res.data.message);
        this.addInfo = {
          title: "",
          city: "",
          content: ""
        };
        // this.$store.commit("post/setPostData", undefined);
        this.$router.replace("/post");
        
      });
    },
    querySearchAsync(value, cb) {
      if (!value) {
        cb([]);
        return;
      }
      this.$axios({
        url: "/cities",
        params: { name: value }
      }).then(res => {
        //   console.log(res)
        const { data } = res.data;
        const newArr = [];
        data.forEach(v => {
          v.value = v.name;
          newArr.push(v);
        });
        this.addInfo.city = newArr[0].value;
        cb(newArr);
      });
    },
    handleSelect(item) {
      this.addInfo.city = item.value;
    }
  }
};
</script>

<style lang="less" scoped>
.create {
  margin: 20px auto;
  width: 1000px;
  h2 {
    font-size: 22px;
    font-weight: 400;
    margin-bottom: 10px;
  }
  p {
    font-size: 12px;
    color: #999;
    margin-bottom: 10px;
  }
}
.save {
  font-weight: 400;
  font-size: 14px;
  margin: 0 10px;
  a {
    color: #ffa500;
    &:hover {
      text-decoration: underline;
    }
  }
}
/deep/.ql-editor {
  height: 600px;
}

.draftBox {
  width: 180px;
  border: 1px solid #ddd;
  padding: 10px;
  h4 {
    font-size: 16px;
    font-weight: 400;
    margin-bottom: 10px;
    color: #666;
  }
  .draft-post-title {
    font-size: 14px;
    span {
      &:hover {
        color: #ffa500;
        text-decoration: underline;
        cursor: pointer;
      }
    }
    p {
      color: #999;
    }
  }
}
</style>