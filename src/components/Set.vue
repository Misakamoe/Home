<template>
  <div class="setting">
    <el-collapse class="collapse" v-model="activeName" accordion>
      <el-collapse-item title="壁紙" name="1">
        <div class="bg-set">
          <el-radio-group v-model="coverType" text-color="#ffffff" @change="radioChange">
            <el-radio value="0" size="large" border>デフォルト</el-radio>
            <el-radio value="1" size="large" border>今日の写真</el-radio>
            <el-radio value="2" size="large" border>ランダムな風景</el-radio>
            <el-radio value="3" size="large" border>ランダムアニメ</el-radio>
          </el-radio-group>
        </div>
      </el-collapse-item>
      <el-collapse-item title="パーソナライズする" name="2">
        <div class="item">
          <span class="text">ウェブサイト作成日</span>
          <el-switch v-model="siteStartShow" inline-prompt :active-icon="CheckSmall" :inactive-icon="CloseSmall" />
        </div>
        <div class="item">
          <span class="text">ミュージックパネル</span>
          <el-switch v-model="musicClick" inline-prompt :active-icon="CheckSmall" :inactive-icon="CloseSmall" />
        </div>
        <div class="item">
          <span class="text">下部バーの歌詞</span>
          <el-switch v-model="playerLrcShow" inline-prompt :active-icon="CheckSmall" :inactive-icon="CloseSmall" />
        </div>
        <div class="item">
          <span class="text">ぼやけた下部バーの背景</span>
          <el-switch v-model="footerBlur" inline-prompt :active-icon="CheckSmall" :inactive-icon="CloseSmall" />
        </div>
      </el-collapse-item>
      <el-collapse-item title="プレーヤーの構成" name="3">
        <div class="item">
          <span class="text">自動再生</span>
          <el-switch v-model="playerAutoplay" inline-prompt :active-icon="CheckSmall" :inactive-icon="CloseSmall" />
        </div>
        <div class="item">
          <span class="text">シャッフル再生</span>
          <el-switch v-model="playerOrder" inline-prompt :active-icon="CheckSmall" :inactive-icon="CloseSmall"
            active-value="random" inactive-value="list" />
        </div>
        <div class="item">
          <span class="text">サイクルモード</span>
          <el-radio-group v-model="playerLoop" size="small" text-color="#FFFFFF">
            <el-radio value="all" border>リスト</el-radio>
            <el-radio value="one" border>シングル</el-radio>
            <el-radio value="none" border>ループなし</el-radio>
          </el-radio-group>
        </div>
      </el-collapse-item>
      <el-collapse-item title="その他の設定" name="4">
        <div>つづく</div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script setup>
import { CheckSmall, CloseSmall, SuccessPicture } from "@icon-park/vue-next";
import { mainStore } from "@/store";
import { storeToRefs } from "pinia";

const store = mainStore();
const {
  coverType,
  siteStartShow,
  musicClick,
  playerLrcShow,
  footerBlur,
  playerAutoplay,
  playerOrder,
  playerLoop,
} = storeToRefs(store);

// 默认选中项
const activeName = ref("1");

// 壁纸切换
const radioChange = () => {
  ElMessage({
    message: "切り替えが成功しました",
    icon: h(SuccessPicture, {
      theme: "filled",
      fill: "#efefef",
    }),
  });
};
</script>

<style lang="scss" scoped>
.setting {
  .collapse {
    border-radius: 8px;
    --el-collapse-content-bg-color: #ffffff10;
    border-color: transparent;
    overflow: hidden;

    :deep(.el-collapse-item__header) {
      background-color: #ffffff30;
      color: #fff;
      font-size: 15px;
      padding-left: 18px;
      border-color: transparent;
    }

    :deep(.el-collapse-item__wrap) {
      border-color: transparent;

      .el-collapse-item__content {
        padding: 20px;

        .item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          font-size: 14px;

          .el-switch__core {
            border-color: transparent;
            background-color: #ffffff30;
          }

          .el-radio-group {
            .el-radio {
              margin: 2px 10px 2px 0;
              border-radius: 5px;

              &:last-child {
                margin-right: 0;
              }
            }
          }
        }

        .el-radio-group {
          justify-content: space-between;

          .el-radio {
            margin: 10px 16px;
            background: #ffffff26;
            border: 2px solid transparent;
            border-radius: 8px;

            .el-radio__label {
              color: #fff;
            }

            .el-radio__inner {
              background: #ffffff06 !important;
              border: 2px solid #eeeeee !important;
            }

            &.is-checked {
              background: #ffffff06 !important;
              border: 2px solid #eeeeee !important;
            }

            .is-checked {
              .el-radio__inner {
                background-color: #ffffff30 !important;
                border-color: #fff !important;
              }

              &+.el-radio__label {
                color: #fff !important;
              }
            }
          }
        }
      }
    }
  }
}
</style>
