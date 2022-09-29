<!--
 * 严肃声明：
 * 开源版本请务必保留此注释头信息，若删除我方将保留所有法律责任追究！
 * 本系统已申请软件著作权，受国家版权局知识产权以及国家计算机软件著作权保护！
 * 可正常分享和学习源码，不得用于违法犯罪活动，违者必究！
 * Copyright (c) 2020 陈尼克 all rights reserved.
 * 版权所有，侵权必究！
 *
-->

<template>
  <div>
    <header class="home-header wrap">
      <div class="header-title">
        <img src="@/assets/logo.png" alt="">
        <h3>-入职信息采集表</h3>
      </div>
      <p>职工版</p>
    </header>
    <div class="content">
      <van-form @submit="onSubmit" style="margin:0 16px"  :model="employeeForm">
        <!-- <van-cell-group inset> -->
          <div class="content-title">个人基本信息</div>
          <van-field required v-model="employeeForm.realName" name="姓名" label="姓名" placeholder="姓名" :rules="[{ required: true, message: '请填写姓名' }]"/>
          <van-field required  name="radio" label="性别">
            <template #input>
              <van-radio-group v-model="employeeForm.gender" direction="horizontal">
                <van-radio name="0">男</van-radio>
                <van-radio name="1">女</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <van-field required label="民族" v-model="employeeForm.nation" is-link readonly @click="showNation = true" placeholder="民族"  :rules="[{ required: true, message: '请填写民族' }]"/>
          <van-popup v-model:show="showNation" round position="bottom">
            <van-picker
              :columns="nationList"
              @cancel="showNation = false"
              @confirm="nationConfirm"
            />
          </van-popup>
          <van-field required  name="uploader" label="个人照片">
            <template #input>
              <van-uploader v-model="fileList" @delete="deleteHeadUrl" :after-read="afterRead"  multiple  :max-count="1"/>
            </template>
          </van-field>
          <van-field required label="政治面貌" v-model="employeeForm.politicalOutlook" is-link readonly @click="showPoliticsStatus = true" placeholder="政治面貌"  :rules="[{ required: true, message: '请填写政治面貌' }]"/>
          <van-popup v-model:show="showPoliticsStatus" round position="bottom">
            <van-picker
              :columns="politicsStatusList"
              @cancel="showPoliticsStatus = false"
              @confirm="politicsStatusConfirm"
            />
          </van-popup>
          <van-field required label="婚姻状况" v-model="employeeForm.maritalStatus" is-link readonly @click="showMarriage = true" placeholder="婚姻状况"  :rules="[{ required: true, message: '请填写婚姻状况' }]"/>
          <van-popup v-model:show="showMarriage" round position="bottom">
            <van-picker
              :columns="marriageList"
              @cancel="showMarriage = false"
              @confirm="marriageConfirm"
            />
          </van-popup>
          <van-field required v-model="employeeForm.nativePlace" is-link readonly name="area" label="籍贯" placeholder="籍贯" :rules="[{ required: true, message: '请填写籍贯' }]" @click="showNativePlace = true"/>
          <van-popup v-model:show="showNativePlace" position="bottom">
            <van-area :area-list="areaList" @confirm="nativePlaceConfirm" :columns-num="2" @cancel="showNativePlace = false"/>
          </van-popup>
          <van-field required label="户口类型" v-model="employeeForm.residenceType" is-link readonly @click="showHouseholdType = true" placeholder="户口类型"  :rules="[{ required: true, message: '请填写户口类型' }]"/>
          <van-popup v-model:show="showHouseholdType" round position="bottom">
            <van-picker
              :columns="householdTypeList"
              @cancel="showHouseholdType = false"
              @confirm="householdTypeConfirm"
            />
          </van-popup>
          <van-field required v-model="employeeForm.residenceAddr" is-link readonly name="area" label="户口所在地" placeholder="户口所在地" :rules="[{ required: true, message: '请填写户口所在地' }]" @click="showArea = true"/>
          <van-popup v-model:show="showArea" position="bottom">
            <van-area :area-list="areaList" @confirm="areaConfirm" @cancel="showArea = false"/>
          </van-popup>
          <van-field required label="手机号" v-model="employeeForm.mobile" placeholder="手机号" :rules="telRules" name="mobile"></van-field>
          <van-field required v-model="employeeForm.idCard" name="身份证号码" label="身份证号码" placeholder="身份证号码" :rules="idCardRules"/>
          <van-field required v-model="employeeForm.birthDate" name="出生日期" label="出生日期" placeholder="出生日期" :rules="[{ required: true, message: '请填写出生日期' }]" @click="show2 = true"/>
          <van-popup v-model:show="show2" position="bottom">
             <van-datetime-picker type="date" v-model="currDate" :min-date="minDate" :max-date="maxDate" @confirm="onConfirm2" @cancel="show2=false"/>
          </van-popup>
          <van-field required v-model="_idCardAddr" is-link readonly name="area" label="身份证地址" placeholder="身份证地址" :rules="[{ required: true, message: '请填写身份证地址' }]" @click="showArea2 = true"/>
          <van-popup v-model:show="showArea2" position="bottom">
            <van-area :area-list="areaList" @confirm="areaConfirm2" @cancel="showArea2 = false"/>
          </van-popup>
          <van-field v-model="employeeForm.idCardAddr" />
          <van-field required v-model="employeeForm.issuingAuthority" name="身份证签发机关" label="身份证签发机关" label-width="98" placeholder="身份证签发机关" :rules="[{ required: true, message: '请填写身份证签发机关' }]"/>
          <van-field required v-model="employeeForm.idCardStartDate" name="身份证有效开始时间" label-width="126" label="身份证有效开始时间" placeholder="身份证有效开始时间" :rules="[{ required: true, message: '请填写身份证有效开始时间' }]" @click="show = true"/>
          <van-popup v-model:show="show" position="bottom">
             <van-datetime-picker type="date" v-model="currDate" :min-date="minDate" :max-date="maxDate" @confirm="onConfirm" @cancel="show=false"/>
          </van-popup>
          <van-field required v-model="employeeForm.idCardExpireDate" name="身份证有效结束时间" label-width="126" label="身份证有效结束时间" placeholder="身份证有效结束时间" :rules="[{ required: true, message: '请填写身份证有效结束时间' }]" @click="show5 = true"/>
          <van-popup v-model:show="show5" position="bottom">
             <van-datetime-picker type="date" v-model="currDate" :min-date="minDate" :max-date="maxDate2" @confirm="onConfirm5" @cancel="show5=false"/>
          </van-popup>
          <van-field required v-model="employeeForm.emergency" name="紧急联系人" label="紧急联系人" placeholder="紧急联系人" :rules="[{ required: true, message: '请填写紧急联系人' }]"/>
          <van-field required label="紧急联系人与本人关系" v-model="employeeForm.emergencyRelation" is-link readonly @click="showEmergencyContact2 = true" placeholder="紧急联系人与本人关系"  :rules="[{ required: true, message: '请填写紧急联系人与本人关系' }]"/>
          <van-popup v-model:show="showEmergencyContact2" round position="bottom">
            <van-picker
              :columns="emergencyContact2List"
              @cancel="showEmergencyContact2 = false"
              @confirm="emergencyContact2Confirm"
            />
          </van-popup>
          <van-field required label="紧急联系人电话" label-width="98" v-model="employeeForm.emergencyMobile" placeholder="紧急联系人电话" :rules="telRules" name="mobile"></van-field>    
       <van-field required v-model="_address" is-link readonly name="area" label="现居住地址" placeholder="现居住地址" :rules="[{ required: true, message: '请填写现居住地址' }]" @click="showArea3 = true"/>
          <van-popup v-model:show="showArea3" position="bottom">
            <van-area :area-list="areaList" @confirm="areaConfirm3" @cancel="showArea3 = false"/>
          </van-popup>
        <van-field v-model="employeeForm.address"/>  
        <van-field required v-model="_postAddress" is-link readonly name="area" label="邮寄地址" placeholder="邮寄地址" :rules="[{ required: true, message: '请填写邮寄地址' }]" @click="showArea4 = true"/>
          <van-popup v-model:show="showArea4" position="bottom">
            <van-area :area-list="areaList" @confirm="areaConfirm4" @cancel="showArea4 = false"/>
          </van-popup>
        <van-field v-model="employeeForm.postAddress" style="margin-bottom:8px"/>  
        <div class="content-title">家庭关系</div>
        <div v-if="familyVisible" :model="familyForm" ref="familyRef">
          <template v-for="(item, index) in familyForm.familyRelations" :key="index">
            <van-field label="与本人关系" v-model="item.relation" is-link readonly @click="item.showEmergencyContact = true" placeholder="与本人关系" />
            <van-popup v-model:show="item.showEmergencyContact" round position="bottom">
              <van-picker
                :columns="emergencyContact2List"
                @cancel="item.showEmergencyContact=false"
                @confirm="emergencyContact4Confirm($event,index)"
              />
            </van-popup> 
            <van-field required v-model="item.name" name="姓名" label="姓名" placeholder="姓名" :rules="[{ required: true, message: '请填写姓名' }]"/>
            <van-field required  name="radio" label="性别">
              <template #input>
                <van-radio-group v-model="item.gender" direction="horizontal">
                  <van-radio name="0">男</van-radio>
                  <van-radio name="1">女</van-radio>
                </van-radio-group>
              </template>
            </van-field>
            <van-field required label="联系电话" v-model="item.mobile" placeholder="联系电话" :rules="telRules" name="mobile"></van-field>
            <van-button icon="minus" type="danger" style="display:flex;margin:6px auto;" @click="familyDel(item)"/>
          </template>
        </div>
        <!-- </van-cell-group> -->
        <van-button icon="plus" type="primary" style="display:flex;margin:0px auto;margin-top:10px;margin-bottom:10px" @click="familyAdd"/>

        <div class="content-title">教育经历</div>
        <div v-if="educationVisible" :model="educationForm" ref="educationRef">
          <template v-for="(item, index) in educationForm.educationalExperience" :key="index">
            <van-field required v-model="item.enterDate" name="入学时间" label="入学时间" placeholder="入学时间" :rules="[{ required: true, message: '请填写入学时间' }]" @click="item.show = true"/>
            <van-popup v-model:show="item.show" position="bottom">
              <van-datetime-picker type="date" v-model="currDate" :min-date="minDate" :max-date="maxDate" @confirm="onConfirm7($event,index)" @cancel="item.show = false"/>
            </van-popup>
            <van-field required v-model="item.leaveDate" name="毕业时间" label="毕业时间" placeholder="毕业时间" :rules="[{ required: true, message: '请填写毕业时间' }]" @click="item.show2 = true"/>
            <van-popup v-model:show="item.show2" position="bottom">
              <van-datetime-picker type="date" v-model="currDate" :min-date="minDate" :max-date="maxDate" @confirm="onConfirm8($event,index)" @cancel="item.show2 = false"/>
            </van-popup>
            <van-field required v-model="item.schoolName" name="毕业院校" label="毕业院校" placeholder="毕业院校" :rules="[{ required: true, message: '请填写毕业院校' }]"/>
            <van-field required v-model="item.major" name="专业" label="专业" placeholder="专业" :rules="[{ required: true, message: '请填写专业' }]"/>
            <van-field required label="学历" v-model="item.education" is-link readonly @click="item.showEducation = true" placeholder="学历"  :rules="[{ required: true, message: '请填写学历' }]"/>
              <van-popup v-model:show="item.showEducation" round position="bottom">
                <van-picker
                  :columns="educationList"
                  @cancel="item.showEducation = false"
                  @confirm="educationConfirm($event,index)"
                />
              </van-popup>
            <van-field required label="学位" v-model="item.educationCertificate" is-link readonly @click="item.showEducationCertificate = true" placeholder="学位"  :rules="[{ required: true, message: '请填写学位' }]"/>
              <van-popup v-model:show="item.showEducationCertificate" round position="bottom">
                <van-picker
                  :columns="educationCertificateList"
                  @cancel="item.showEducationCertificate = false"
                  @confirm="educationCertificateConfirm($event,index)"
                />
              </van-popup>
            <van-field required label="学习方式" v-model="item.studyStyle" is-link readonly @click="item.showStudyStyle = true" placeholder="学习方式"  :rules="[{ required: true, message: '请填写学习方式' }]"/>
              <van-popup v-model:show="item.showStudyStyle" round position="bottom">
                <van-picker
                  :columns="studyStyleList"
                  @cancel="item.showStudyStyle = false"
                  @confirm="studyStyleConfirm($event,index)"
                />
              </van-popup>
            <van-button icon="minus" type="danger" style="display:flex;margin:6px auto;" @click="educationDel(item)"/>
          </template>
        </div>
        <van-button icon="plus" type="primary" style="display:flex;margin:0px auto;margin-top:10px;margin-bottom:10px" @click="educationAdd"/>
        <div class="content-title">健康状况</div>
        <div :model="healthForm" ref="healthRef">
            <van-field label="目前身体状况" v-model="healthForm.health" is-link readonly @click="healthForm.showPhysicalCondition = true" placeholder="目前身体状况" />
            <van-popup v-model:show="healthForm.showPhysicalCondition" round position="bottom">
              <van-picker
                :columns="physicalConditionList"
                @cancel="healthForm.showPhysicalCondition = false"
                @confirm="physicalConditionConfirm"
              />
            </van-popup> 
            <van-field required  name="radio" label="一年内有无重大手术病史">
              <template #input>
                <van-radio-group v-model="healthForm.oneYearSurgicalHistory" direction="horizontal">
                  <van-radio name="0">无</van-radio>
                  <van-radio name="1">有</van-radio>
                </van-radio-group>
              </template>
            </van-field>
            <van-field required  name="radio" label="有无重大疾病或遗传性病史">
              <template #input>
                <van-radio-group v-model="healthForm.majorDiseasesHistory" direction="horizontal">
                  <van-radio name="0">无</van-radio>
                  <van-radio name="1">有</van-radio>
                </van-radio-group>
              </template>
            </van-field>
            <van-field required  name="radio" label="有无传染性疾病">
              <template #input>
                <van-radio-group v-model="healthForm.infectiousDiseases" direction="horizontal">
                  <van-radio name="0">无</van-radio>
                  <van-radio name="1">有</van-radio>
                </van-radio-group>
              </template>
            </van-field>
        </div>
        <div class="content-title">其他情况</div>
        <div :model="otherForm" ref="otherRef">
            <van-field required  name="radio" label-width="170" label="在原单位是否签订过与我司所任此职位相关的保密协议">
              <template #input>
                <van-radio-group v-model="otherForm.secrecyAgreement" direction="horizontal">
                  <van-radio name="0">无</van-radio>
                  <van-radio name="1">有</van-radio>
                </van-radio-group>
              </template>
            </van-field>
            <van-field required  name="radio" label-width="170" label="是否仍处于竞业限制期内">
              <template #input>
                <van-radio-group v-model="otherForm.restrictTime" direction="horizontal">
                  <van-radio name="0">否</van-radio>
                  <van-radio name="1">是</van-radio>
                </van-radio-group>
              </template>
            </van-field>
            <van-field required  name="radio" label-width="170" label="有无触犯法律、法规记录">
              <template #input>
                <van-radio-group v-model="otherForm.illegalRecord" direction="horizontal">
                  <van-radio name="0">无</van-radio>
                  <van-radio name="1">有</van-radio>
                </van-radio-group>
              </template>
            </van-field>
            <van-field required  name="radio" label-width="170" label="有无受过原单位重大处分或惩罚">
              <template #input>
                <van-radio-group v-model="otherForm.majorPenalize" direction="horizontal">
                  <van-radio name="0">无</van-radio>
                  <van-radio name="1">有</van-radio>
                </van-radio-group>
              </template>
            </van-field>
        </div>

        <!-- <van-field v-model="employeeForm.recruiter" name="招聘人姓名" label="招聘人姓名" placeholder="招聘人姓名" /> -->
        
        <div style="padding: 20px 0">
          <van-button round block type="primary" native-type="submit">
            提交
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { workerInfoSave,ossUpload,deleteFiles} from '@/service/home'
import { Toast } from 'vant'
import { areaList } from '@vant/area-data'
export default {
  name: 'home',
  components: {
  },
  setup() {
    const router = useRouter()
    const state = reactive({
      swiperList: [], // 轮播图列表
      isLogin: false, // 是否已登录
      headerScroll: false, // 滚动透明判断
      hots: [],
      newGoodses: [],
      recommends: [],
      loading: true,
      username:'',
      password:'',
      idCardRules:[{
            required: true,
            message: '身份证号不能为空',
            trigger: 'onBlur'
        }, {
            validator: value => {
                return /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
                    .test(value)
            },
            message: '请输入正确格式的身份证号码',
            trigger: 'onBlur'
      }],
      telRules:[{
            required: true,
            message: '手机号不能为空',
            trigger: 'onBlur'
        }, {
            validator: value => {
                return /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
                    .test(value)
            },
            message: '请输入正确格式的手机号',
            trigger: 'onBlur'
      }],
      currDate:new Date(),
      date: '',
      show:false,
      date2: '',
      show2:false,
      show5:false,
      show6:false,
      showArea:false,
      showArea2:false,
      _idCardAddr:'',
      showArea3:false,
      _address:'',
      showArea4:false,
      _postAddress:'',
      showNativePlace:false,
      showNation:false,
      nationList : [
        {
          id: 1,
          text: "HA/汉族",
          value: 1,
        },
        {
          id: 2,
          text: "AC/阿昌族",
          value: 2,
        },
        {
          id: 3,
          text: "BA/白族",
          value: 3,
        },
        {
          id: 4,
          text: "BL/布朗族",
          value: 4,
        },
        {
          id: 5,
          text: "BN/保安族",
          value: 5,
        },
        {
          id: 6,
          text: "BY/布依族",
          value: 6,
        },
        {
          id: 7,
          text: "CS/朝鲜族",
          value: 7,
        },
        {
          id: 8,
          text: "DA/傣族",
          value: 8,
        },
        {
          id: 9,
          text: "DE/德族",
          value: 9,
        },
        {
          id: 10,
          text: "DO/侗族",
          value: 10,
        },
        {
          id: 11,
          text: "DR/独龙族",
          value: 11,
        },
        {
          id: 12,
          text: "DU/达翰尔族",
          value: 12,
        },
        {
          id: 13,
          text: "DX/东乡族",
          value: 13,
        },
        {
          id: 14,
          text: "EW/鄂温克族",
          value: 14,
        },
        {
          id: 15,
          text: "GI/京族",
          value: 15,
        },
        {
          id: 16,
          text: "GL/仡佬族",
          value: 16,
        },
        {
          id: 17,
          text: "GS/高山族",
          value: 17,
        },
        {
          id: 18,
          text: "HU/回族",
          value: 18,
        },
        {
          id: 19,
          text: "HZ/赫哲族",
          value: 19,
        },
        {
          id: 20,
          text: "JN/基诺族",
          value: 20,
        },
        {
          id: 21,
          text: "JP/景颇族",
          value: 21,
        },
        {
          id: 22,
          text: "KG/柯尔克孜族",
          value: 22,
        },
        {
          id: 23,
          text: "KZ/哈萨克族",
          value: 23,
        },
        {
          id: 24,
          text: "LB/珞巴族",
          value: 24,
        },
        {
          id: 25,
          text: "LH/拉祜族",
          value: 25,
        },
        {
          id: 26,
          text: "LI/黎族",
          value: 26,
        },
        {
          id: 27,
          text: "LS/傈僳族",
          value: 27,
        },
        {
          id: 28,
          text: "MA/满族",
          value: 28,
        },
        {
          id: 29,
          text: "MB/门巴族",
          value: 29,
        },
        {
          id: 30,
          text: "MG/蒙古族",
          value: 30,
        },
        {
          id: 31,
          text: "MH/苗族",
          value: 31,
        },
        {
          id: 32,
          text: "ML/仫佬族",
          value: 32,
        },
        {
          id: 33,
          text: "MN/毛南族",
          value: 33,
        },
        {
          id: 34,
          text: "NU/怒族",
          value: 34,
        },
        {
          id: 35,
          text: "NX/纳西族",
          value: 35,
        },
        {
          id: 36,
          text: "OR/鄂伦春族",
          value: 36,
        },
        {
          id: 37,
          text: "PM/普米族",
          value: 37,
        },
        {
          id: 38,
          text: "QI/羌族",
          value: 38,
        },
        {
          id: 39,
          text: "RS/俄罗斯族",
          value: 39,
        },
        {
          id: 40,
          text: "SH/畲族",
          value: 40,
        },
        {
          id: 41,
          text: "SL/萨拉族",
          value: 41,
        },
        {
          id: 42,
          text: "SU/水族",
          value: 42,
        },
        {
          id: 43,
          text: "TA/塔吉克族",
          value: 43,
        },
        {
          id: 44,
          text: "TJ/土家族",
          value: 44,
        },
        {
          id: 45,
          text: "TT/塔塔尔族",
          value: 45,
        },
        {
          id: 46,
          text: "TU/土族",
          value: 46,
        },
        {
          id: 47,
          text: "UG/维吾尔族",
          value: 47,
        },
        {
          id: 48,
          text: "UZ/乌孜别克族",
          value: 48,
        },
        {
          id: 49,
          text: "VA/佤族",
          value: 49,
        },
        {
          id: 50,
          text: "XB/锡伯族",
          value: 50,
        },
        {
          id: 51,
          text: "YA/瑶族",
          value: 51,
        },
        {
          id: 52,
          text: "YG/裕固族",
          value: 52,
        },
        {
          id: 53,
          text: "YI/彝族",
          value: 53,
        },
        {
          id: 54,
          text: "ZA/藏族",
          value: 54,
        },
        {
          id: 55,
          text: "ZH/壮族",
          value: 55,
        },
        {
          id: 56,
          text: "CQ/穿青族",
          value: 56,
        },
      ],
      showMarriage:false,
      marriageList:['未婚','已婚','离婚','丧偶'],
      showHouseholdType:false,
      householdTypeList:['1/城镇户口','2/农业户口','3/其他','9/深圳户口'],
      showEmergencyContact2:false,
      emergencyContact2List:['10/配偶','11/父亲','12/母亲','13/子女','14/兄弟姐妹','15/朋友','16/同学','99/其他关系'],
      education:'',
      showEducation:false,
      educationList:['10/博士研究生','11/硕士研究生','12/大学本科','13/大学专科','14/中专中技','15/高中','16/初中','17/小学'],
      showEducationCertificate:false,
      educationCertificateList:['10/学士','11/硕士','12/博士及以上','Z1/无'],
      photo:[],
      diploma:[],
      identityCardFront:[],
      identityCardReverse:[],
      resume:[],
      physicalExamination:[],
      elseSkill:[],
      dimission:[],
      showPoliticsStatus:false,
      politicsStatusList:['10/群众','11/中共党员','12/中共预备党员','13/共青团员','99/其他政党'],
      minDate: new Date(1940, 1, 1),
      maxDate: new Date(),
      maxDate2: new Date(2099,12,31),
      familyVisible:false,
      familyForm: {
          familyRelations: [{
              relation: '',
              showEmergencyContact:false,
          }]
      },
      educationVisible:false,
      educationForm: {
          educationalExperience: [{
              show:false,
              date: '',
          }]
      },
      studyStyleList:['10/统招全日制','11/自考','12/成人教育','13/函授','14/夜校教育','15/远程教育'],
      costAssumeList:['公司全额承担','个人全额承担','公司和个人比例承担'],
      healthForm: {showPhysicalCondition:false,},
      physicalConditionList:['10/健康', '11/良好', '12/抱恙'],
      otherForm:{},
      employeeForm:{
        name:'',
        gender:'0',
        mobile:'',
        nation:'',
        politicalOutlook:'',
        maritalStatus:'',
        nativePlace:'',
        residenceType:'',
        residenceAddr:'',
        childrenNumber:'',
        idCard:'',
        idCardAddr:'',
        birthDate: '',
        issuingAuthority:'',
        idCardStartDate:'',
        idCardExpireDate: '',
        emergency:'',
        emergencyMobile:'',
        emergencyRelation:'',
        relativePerson:'',
        address:'',
        postAddress:'',
        headUrl:'',
        
      },
      fileList:[],
    })
    const formatDate = (date) => `${date.getFullYear()}-${(date.getMonth() + 1)<10?'0'+(date.getMonth() + 1):(date.getMonth() + 1)}-${date.getDate()<10?'0'+date.getDate():date.getDate()}`;
    const onConfirm = (value) => {
      state.show = false;
      state.employeeForm.idCardStartDate = formatDate(value);
    }
    const onConfirm2 = (value) => {
      state.show2 = false;
      state.employeeForm.birthDate = formatDate(value);
    }
    const onConfirm5 = (value) => {
      state.show5 = false;
      state.employeeForm.idCardExpireDate = formatDate(value);
    }
    const onConfirm7 = (value,index) => {
      state.educationForm.educationalExperience[index].show = false;
      state.educationForm.educationalExperience[index].enterDate = formatDate(value);
    }
    const onConfirm8 = (value,index) => {
      state.educationForm.educationalExperience[index].show2 = false;
      state.educationForm.educationalExperience[index].leaveDate = formatDate(value);
    }
    const studyStyleConfirm = (value,index) => {
      state.educationForm.educationalExperience[index].showStudyStyle = false;
      state.educationForm.educationalExperience[index].studyStyle = value;
    }
    const areaConfirm = (areaValues) => {
      state.showArea = false;
      state.employeeForm.residenceAddr = areaValues
        .filter((item) => !!item)
        .map((item) => item.name)
        .join('/');
    };
    const areaConfirm2 = (areaValues) => {
      state.showArea2 = false;
      state._idCardAddr = areaValues
        .filter((item) => !!item)
        .map((item) => item.name)
        .join('/');
    };
    const areaConfirm3 = (areaValues) => {
      state.showArea3 = false;
      state._address = areaValues
        .filter((item) => !!item)
        .map((item) => item.name)
        .join('/');
    };
    const areaConfirm4 = (areaValues) => {
      state.showArea4 = false;
      state._postAddress = areaValues
        .filter((item) => !!item)
        .map((item) => item.name)
        .join('/');
    };
    const nativePlaceConfirm = (areaValues) => {
      state.showNativePlace = false;
      state.employeeForm.nativePlace = areaValues
        .filter((item) => !!item)
        .map((item) => item.name)
        .join('/');
    };
    const nationConfirm = (value) => {
      state.employeeForm.nation = value.text;
      state.showNation = false;
    };
    const politicsStatusConfirm = (value) => {
      state.employeeForm.politicalOutlook = value;
      state.showPoliticsStatus = false;
    };
    const marriageConfirm = (value) => {
      state.employeeForm.maritalStatus = value;
      state.showMarriage = false;
    };
    const householdTypeConfirm = (value) => {
      state.employeeForm.residenceType = value;
      state.showHouseholdType = false;
    };
    const emergencyContact2Confirm = (value) => {
      state.employeeForm.emergencyRelation = value;
      state.showEmergencyContact2 = false;
    };
    const emergencyContact4Confirm = (value,index) => {
      state.familyForm.familyRelations[index].relation = value;
      state.familyForm.familyRelations[index].showEmergencyContact = false;
    };
    const educationConfirm = (value,index) => {
      state.educationForm.educationalExperience[index].showEducation = false;
      state.educationForm.educationalExperience[index].education = value;
    };
    const educationCertificateConfirm = (value,index) => {
      state.educationForm.educationalExperience[index].showEducationCertificate = false;
      state.educationForm.educationalExperience[index].educationCertificate = value;
    };
    const familyAdd = ()=>{
      if(!state.familyVisible){state.familyVisible = true; return;}
      state.familyForm.familyRelations.push({
            relation: '',
        })
    };
    const familyDel = (item)=>{
      const index = state.familyForm.familyRelations.indexOf(item)
      if (index !== -1) {
          state.familyForm.familyRelations.splice(index, 1)
      }
    };
    const educationAdd = ()=>{
      if(!state.educationVisible){state.educationVisible = true; return;}
      state.educationForm.educationalExperience.push({
            emergencyContact4: '',
        })
    };
    const educationDel = (item)=>{
      const index = state.educationForm.educationalExperience.indexOf(item)
      if (index !== -1) {
          state.educationForm.educationalExperience.splice(index, 1)
      }
    };
    const physicalConditionConfirm = (value) => {
      state.healthForm.health = value;
      state.healthForm.showPhysicalCondition = false;
    };
    const onSubmit = async () => {
      const { code } = await workerInfoSave({
        ...state.employeeForm,
        ...state.familyForm,
        ...state.educationForm,
        ...state. healthForm,
        ...state.otherForm
      })
      // const {code} = await workerInfoSave(
      //  {"realName":"七月有风","gender":"0","mobile":"15011111115","nation":"汉族","politicalOutlook":"中共党员",
      //   "maritalStatus":"已婚","nativePlace":"河南省/郑州市",
      //   "residenceType":"非农业户口","residenceAddr":"广东省/广州市/荔湾区","childrenNumber":"2",
      //   "email":"15011111111@qq.com","idCard":"430426202110079999",
      //   "idCardAddr":"广东省东莞","birthDate":"2021-10-07","issuingAuthority":"东莞",
      //   "idCardStartDate":"2021-07-01","idCardExpireDate":"2022-08-17","emergency":"李大",
      //   "emergencyMobile":"15122222222","emergencyRelation":"母子","relativePerson":"杨大",
      //   "address":"东莞","postAddress":"深圳",
      //   "recruiter":"刘总",
      //   "familyRelations":[{"relation":"兄弟姐妹","name":"张三","gender":"0","birthDate":"2022-02-03","company":"华为","position":"总监","mobile":"15011111111"}],
      //   "educationalExperience":[{"show":false,"enterDate":"2022-02-02","show2":false,"leaveDate":"2022-02-09","schoolName":"清华","major":"金融","showEducation":false,"education":"博士","showEducationCertificate":false,"educationCertificate":"博士研究生","showStudyStyle":false,"studyStyle":"统招全日制","highestEducation":"1","highestDegree":"1","post":"委员"}],
      //   "showPhysicalCondition":false,"health":"健康","oneYearSurgicalHistory":"0","majorDiseasesHistory":"0","infectiousDiseases":"0","secrecyAgreement":"0","restrictTime":"0","illegalRecord":"0","majorPenalize":"0"
      //   }
      // )
      
      if(code == '0'){
        Toast.success('保存成功')
      }
      // console.log('submit', values);
    };
    const afterRead = (file) => {
      // file.status = "uploading";
      // file.message = "上传中...";
      let formData = new FormData();
      formData.append("file", file.file);
      ossUpload(formData).then((res) => {
        if(res.code == 0){
          state.employeeForm.headUrl = res.data.src;
        }else{
          Toast.fail('服务端异常,请稍后再试！')
        }
      });
    };
    const deleteHeadUrl = ()=>{
      let formData = new FormData();
      formData.append("fileName", state.employeeForm.headUrl.substr(6,state.employeeForm.headUrl.length));
      deleteFiles(formData).then((res) => {
        if(res.code !=0){
          Toast.fail('删除失败,请稍后再试！')
        }
      });
    };
    nextTick(() => {
      window.addEventListener('scroll', () => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        scrollTop > 100 ? state.headerScroll = true : state.headerScroll = false
      })
    })

    const goToDetail = (item) => {
      router.push({ path: `/product/${item.goodsId}` })
    }

    const tips = () => {
      Toast('敬请期待');
    }

    return {
      ...toRefs(state),
      goToDetail,
      tips,
      onConfirm,
      onConfirm2,
      areaList,
      areaConfirm,
      nationConfirm,
      marriageConfirm,
      educationConfirm,
      educationCertificateConfirm,
      nativePlaceConfirm,
      politicsStatusConfirm,
      householdTypeConfirm,
      onConfirm5,
      emergencyContact2Confirm,
      emergencyContact4Confirm,
      familyAdd,
      familyDel,
      onConfirm7,
      onConfirm8,
      educationAdd,
      educationDel,
      studyStyleConfirm,
      physicalConditionConfirm,
      onSubmit,
      areaConfirm2,
      areaConfirm3,
      areaConfirm4,
      afterRead,
      deleteHeadUrl,
    }
  },
}
</script>

<style lang="less" scoped >
  @import '../common/style/mixin';
  .home-header {
    .header-title{
      display:flex;
      justify-content: center;
      align-items: center;
      height: 70px;
      img{
        background-color:rgb(124, 26, 26);
        width:160px;
        height:22px;
      }
      h3{
        font-size:24px;
        font-weight:500;
        margin-left:3px;
      }
    } 
    p{
      margin-top:-18px;
      text-align: center;
    }
  }
  .content{
    .content-title{
      height:38px;
      line-height:38px;
      color: #333;
      background-color: #f5f5f5;
      border-color: #ddd;
      font-size: 16px;
      padding-left: 16px;
    }
  }
</style>