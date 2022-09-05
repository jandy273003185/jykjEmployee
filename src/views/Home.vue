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
      <p>职员版</p>
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
          <van-field required readonly v-model="employeeForm.marriedDate" name="结婚时间" label="结婚时间" placeholder="结婚时间" :rules="[{ required: true, message: '请填写结婚时间' }]" @click="show3=true"/>
          <van-popup v-model:show="show3" position="bottom">
             <van-datetime-picker type="date" v-model="currDate" :min-date="minDate" :max-date="maxDate" @confirm="onConfirm3" @cancel="show3=false"/>
          </van-popup>
          <van-field required type="number" v-model="employeeForm.childrenNumber" name="子女数目" label="子女数目" placeholder="子女数目" :rules="[{ required: true, message: '请填写子女数目' }]"/>
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
          <van-field required v-model="employeeForm.email" name="E-mail" label="E-mail" placeholder="E-mail" :rules="[{ required: true, message: '请填写邮箱' }]"/>
          <van-field required v-model="employeeForm.workTime" name="参加工作时间" label="参加工作时间" placeholder="参加工作时间" :rules="[{ required: true, message: '请填写参加工作时间' }]" @click="show4 = true"/>
          <van-popup v-model:show="show4" position="bottom">
             <van-datetime-picker type="date" v-model="currDate" :min-date="minDate" :max-date="maxDate" @confirm="onConfirm4" @cancel="show4=false"/>
          </van-popup>
          <van-field required v-model="employeeForm.idCard" name="身份证号码" label="身份证号码" placeholder="身份证号码" :rules="[{ required: true, message: '请填写身份证号码' }]"/>
          <van-field required v-model="employeeForm.birthDate" name="出生日期" label="出生日期" placeholder="出生日期" :rules="[{ required: true, message: '请填写出生日期' }]" @click="show2 = true"/>
          <van-popup v-model:show="show2" position="bottom">
             <van-datetime-picker type="date" v-model="currDate" :min-date="minDate" :max-date="maxDate" @confirm="onConfirm2" @cancel="show2=false"/>
          </van-popup>
          <van-field required v-model="employeeForm.idCardAddr" name="身份证地址" label="身份证地址" placeholder="身份证地址" :rules="[{ required: true, message: '请填写身份证地址' }]"/>
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
          <van-field required  name="radio" label="是否有亲友任职于我司">
            <template #input>
              <van-radio-group v-model="employeeForm.relativeEmployment" direction="horizontal">
                <van-radio name="0">否</van-radio>
                <van-radio name="1">是</van-radio>
              </van-radio-group>
            </template>
        </van-field>
        <van-field v-model="employeeForm.relativePerson" name="任职于我司亲友姓名" label="任职于我司亲友姓名" placeholder="任职于我司亲友姓名"/>  
        <van-field label="任职于我司亲友与本人关系" v-model="employeeForm.relativePersonRelation" is-link readonly @click="showEmergencyContact3 = true" placeholder="任职于我司亲友与本人关系" />
          <van-popup v-model:show="showEmergencyContact3" round position="bottom">
            <van-picker
              :columns="emergencyContact2List"
              @cancel="showEmergencyContact3 = false"
              @confirm="emergencyContact3Confirm"
            />
          </van-popup> 
        <van-field v-model="employeeForm.relativePersonDepart" name="任职于我司亲友任职部门" label="任职于我司亲友任职部门" placeholder="任职于我司亲友任职部门"/>
        <van-field required v-model="employeeForm.address" name="现居住地址" label="现居住地址" placeholder="现居住地址" :rules="[{ required: true, message: '请填写现居住地址' }]"/>  
        <van-field required v-model="employeeForm.postAddress" name="邮寄地址" label="邮寄地址" placeholder="邮寄地址" :rules="[{ required: true, message: '请填写邮寄地址' }]"/>  
        <div class="content-title">家庭关系</div>
        <div v-if="familyVisible" :model="familyForm" ref="familyRef">
          <template v-for="(item, index) in familyForm.familyRelations" :key="index">
            <van-field label="与本人关系" v-model="item.relation" is-link readonly @click="item.showEmergencyContact = true" placeholder="与本人关系" />
            <van-popup v-model:show="item.showEmergencyContact" round position="bottom">
              <van-picker
                :columns="emergencyContact4List"
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
            <van-field required v-model="item.birthDate" name="出生日期" label="出生日期" placeholder="出生日期" :rules="[{ required: true, message: '请填写出生日期' }]" @click="item.show = true"/>
            <van-popup v-model:show="item.show" position="bottom">
              <van-datetime-picker type="date" v-model="currDate" :min-date="minDate" :max-date="maxDate" @confirm="onConfirm6($event,index)" @cancel="item.show = false"/>
            </van-popup>
            <van-field required v-model="item.company" name="工作单位" label="工作单位" placeholder="工作单位" :rules="[{ required: true, message: '请填写工作单位' }]"/>
            <van-field required v-model="item.position" name="任职情况" label="任职情况" placeholder="任职情况" :rules="[{ required: true, message: '请填写任职情况' }]"/>
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
            <van-field required  name="radio" label="是否最高学历">
              <template #input>
                <van-radio-group v-model="item.highestEducation" direction="horizontal">
                  <van-radio name="0">否</van-radio>
                  <van-radio name="1">是</van-radio>
                </van-radio-group>
              </template>
            </van-field>
            <van-field required  name="radio" label="是否最高学位">
              <template #input>
                <van-radio-group v-model="item.highestDegree" direction="horizontal">
                  <van-radio name="0">否</van-radio>
                  <van-radio name="1">是</van-radio>
                </van-radio-group>
              </template>
            </van-field>
            <van-field required v-model="item.post" name="在校职务" label="在校职务" placeholder="在校职务" :rules="[{ required: true, message: '请填写在校职务' }]"/>
            <van-button icon="minus" type="danger" style="display:flex;margin:6px auto;" @click="educationDel(item)"/>
          </template>
        </div>
        <van-button icon="plus" type="primary" style="display:flex;margin:0px auto;margin-top:10px;margin-bottom:10px" @click="educationAdd"/>
        <div class="content-title">工作经历</div>
        <div v-if="workVisible" :model="workForm" ref="workRef">
          <template v-for="(item, index) in workForm.workExperience" :key="index">
            <van-field required v-model="item.startDate" name="开始时间" label="开始时间" placeholder="开始时间" :rules="[{ required: true, message: '请填写开始时间' }]" @click="item.show = true"/>
            <van-popup v-model:show="item.show" position="bottom">
              <van-datetime-picker type="date" v-model="currDate" :min-date="minDate" :max-date="maxDate" @confirm="onConfirm9($event,index)" @cancel="item.show = false"/>
            </van-popup>
            <van-field required v-model="item.endDate" name="结束时间" label="结束时间" placeholder="结束时间" :rules="[{ required: true, message: '请填写结束时间' }]" @click="item.show2 = true"/>
            <van-popup v-model:show="item.show2" position="bottom">
              <van-datetime-picker type="date" v-model="currDate" :min-date="minDate" :max-date="maxDate" @confirm="onConfirm10($event,index)" @cancel="item.show2 = false"/>
            </van-popup>
            <van-field required v-model="item.company" name="工作单位名称" label="工作单位名称" placeholder="工作单位名称" :rules="[{ required: true, message: '请填写工作单位名称' }]"/>
            <van-field required v-model="item.depart" name="所属部门" label="所属部门" placeholder="所属部门" :rules="[{ required: true, message: '请填写所属部门' }]"/>
            <van-field required v-model="item.post" name="职务名称" label="职务名称" placeholder="职务名称" :rules="[{ required: true, message: '请填写职务名称' }]"/>
            <van-field required v-model="item.witness" name="证明人" label="证明人" placeholder="证明人" :rules="[{ required: true, message: '请填写证明人' }]"/>
            <van-field required label="联系电话" v-model="item.mobile" placeholder="联系电话" :rules="telRules" name="mobile"></van-field>
            <van-button icon="minus" type="danger" style="display:flex;margin:6px auto;" @click="workDel(item)"/>
          </template>
        </div>
        <van-button icon="plus" type="primary" style="display:flex;margin:0px auto;margin-top:10px;margin-bottom:10px" @click="workAdd"/>
        <div class="content-title">出国情况</div>
        <div v-if="goAbroadVisible" :model="goAbroadForm" ref="goAbroadRef">
          <template v-for="(item, index) in goAbroadForm.foreignExperience" :key="index">
            <van-field required v-model="item.startDate" name="开始时间" label="开始时间" placeholder="开始时间" :rules="[{ required: true, message: '请填写开始时间' }]" @click="item.show = true"/>
            <van-popup v-model:show="item.show" position="bottom">
              <van-datetime-picker type="date" v-model="currDate" :min-date="minDate" :max-date="maxDate" @confirm="onConfirm11($event,index)" @cancel="item.show = false"/>
            </van-popup>
            <van-field required v-model="item.endDate" name="结束时间" label="结束时间" placeholder="结束时间" :rules="[{ required: true, message: '请填写结束时间' }]" @click="item.show2 = true"/>
            <van-popup v-model:show="item.show2" position="bottom">
              <van-datetime-picker type="date" v-model="currDate" :min-date="minDate" :max-date="maxDate" @confirm="onConfirm12($event,index)" @cancel="item.show2 = false"/>
            </van-popup>
            <van-field required label="出国事由" v-model="item.cause" is-link readonly @click="item.showGoAbroadFor = true" placeholder="出国事由"  :rules="[{ required: true, message: '请填写出国事由' }]"/>
              <van-popup v-model:show="item.showGoAbroadFor" round position="bottom">
                <van-picker
                  :columns="goAbroadForList"
                  @cancel="item.showGoAbroadFor = false"
                  @confirm="goAbroadForConfirm($event,index)"
                />
              </van-popup>
            <van-field required v-model="item.company" name="所至单位" label="所至单位" placeholder="所至单位" :rules="[{ required: true, message: '请填写所至单位' }]"/>
            <van-field required v-model="item.totalCost" type="number" name="总费用(RMB)" label="总费用(RMB)" placeholder="总费用(RMB)" :rules="[{ required: true, message: '请填写总费用(RMB)' }]"/>
            <van-field required label="费用承担方式" v-model="item.bearMode" is-link readonly @click="item.showCostAssume = true" placeholder="费用承担方式"  :rules="[{ required: true, message: '请填写费用承担方式' }]"/>
              <van-popup v-model:show="item.showCostAssume" round position="bottom">
                <van-picker
                  :columns="costAssumeList"
                  @cancel="item.showCostAssume = false"
                  @confirm="costAssumeConfirm($event,index)"
                />
              </van-popup>
            <van-button icon="minus" type="danger" style="display:flex;margin:6px auto;" @click="goAbroadDel(item)"/>
          </template>
        </div>
        <van-button icon="plus" type="primary" style="display:flex;margin:0px auto;margin-top:10px;margin-bottom:10px" @click="goAbroadAdd"/>
        <div class="content-title">专业技术职称</div>
        <div v-if="professionalTitleVisible" :model="professionalTitleForm" ref="professionalTitleRef">
          <template v-for="(item, index) in professionalTitleForm.personnelMajor" :key="index">
            <van-field required v-model="item.post" name="职称" label="职称" placeholder="职称" :rules="[{ required: true, message: '请填写职称' }]"/>
            <van-field required label="级别" v-model="item.level" is-link readonly @click="item.showRank = true" placeholder="级别"  :rules="[{ required: true, message: '请填写级别' }]"/>
              <van-popup v-model:show="item.showRank" round position="bottom">
                <van-picker
                  :columns="rankList"
                  @cancel="item.showRank = false"
                  @confirm="rankConfirm($event,index)"
                />
              </van-popup>
            <van-field required v-model="item.assessDate" name="评定时间" label="评定时间" placeholder="评定时间" :rules="[{ required: true, message: '请填写评定时间' }]" @click="item.show = true"/>
            <van-popup v-model:show="item.show" position="bottom">
              <van-datetime-picker type="date" v-model="currDate" :min-date="minDate" :max-date="maxDate" @confirm="onConfirm13($event,index)" @cancel="item.show = false"/>
            </van-popup>
            <van-button icon="minus" type="danger" style="display:flex;margin:6px auto;" @click="professionalTitleDel(item)"/>
          </template>
        </div>
        <van-button icon="plus" type="primary" style="display:flex;margin:0px auto;margin-top:10px;margin-bottom:10px" @click="professionalTitleAdd"/>
        <div class="content-title">培训经历</div>
        <div v-if="trainVisible" :model="trainForm" ref="trainRef">
          <template v-for="(item, index) in trainForm.trainingExperience" :key="index">
            <van-field required v-model="item.startDate" name="开始时间" label="开始时间" placeholder="开始时间" :rules="[{ required: true, message: '请填写开始时间' }]" @click="item.show = true"/>
            <van-popup v-model:show="item.show" position="bottom">
              <van-datetime-picker type="date" v-model="currDate" :min-date="minDate" :max-date="maxDate" @confirm="onConfirm14($event,index)" @cancel="item.show = false"/>
            </van-popup>
            <van-field required v-model="item.endDate" name="结束时间" label="结束时间" placeholder="结束时间" :rules="[{ required: true, message: '请填写结束时间' }]" @click="item.show2 = true"/>
            <van-popup v-model:show="item.show2" position="bottom">
              <van-datetime-picker type="date" v-model="currDate" :min-date="minDate" :max-date="maxDate" @confirm="onConfirm15($event,index)" @cancel="item.show2 = false"/>
            </van-popup>
            <van-field required v-model="item.content" name="培训内容" label="培训内容" placeholder="培训内容" :rules="[{ required: true, message: '请填写培训内容' }]"/>
            <van-field required v-model="item.institution" name="培训机构" label="培训机构" placeholder="培训机构" :rules="[{ required: true, message: '请填写培训机构' }]"/>
            <van-field required v-model="item.certificate" name="所获证书" label="所获证书" placeholder="所获证书" :rules="[{ required: true, message: '请填写所获证书' }]"/>
            <van-field required v-model="item.totalCost" type="number" name="培训费用(RMB)" label-width="98" label="培训费用(RMB)" placeholder="培训费用(RMB)" :rules="[{ required: true, message: '请填写培训费用(RMB)' }]"/>
            <van-field required label="费用承担方式" v-model="item.bearMode" is-link readonly @click="item.showCostAssume = true" placeholder="费用承担方式"  :rules="[{ required: true, message: '请填写费用承担方式' }]"/>
              <van-popup v-model:show="item.showCostAssume" round position="bottom">
                <van-picker
                  :columns="costAssumeList"
                  @cancel="item.showCostAssume = false"
                  @confirm="costAssumeConfirm2($event,index)"
                />
              </van-popup>
            <van-button icon="minus" type="danger" style="display:flex;margin:6px auto;" @click="trainDel(item)"/>
          </template>
        </div>
        <van-button icon="plus" type="primary" style="display:flex;margin:0px auto;margin-top:10px;margin-bottom:10px" @click="trainAdd"/>
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

        <van-field v-model="employeeForm.recruiter" name="招聘人姓名" label="招聘人姓名" placeholder="招聘人姓名" />
        <!-- <van-field required v-model="username" name="应聘岗位" label="应聘岗位" placeholder="应聘岗位" :rules="[{ required: true, message: '请填写应聘岗位' }]"/> -->
        <!-- <van-field required v-model="username" name="籍贯" label="籍贯" placeholder="省+市，例如 广东东莞" :rules="[{ required: true, message: '请填写籍贯' }]"/> -->
        <!-- <van-field required  name="uploader" label="个人照片">
            <template #input>
              <van-uploader v-model="photo"  multiple  :max-count="1"/>
            </template>
        </van-field>
        <van-field required  name="uploader" label="毕业证书">
            <template #input>
              <van-uploader v-model="diploma"  multiple  :max-count="1"/>
            </template>
        </van-field>
        <van-field required  name="uploader" label="身份证正面">
            <template #input>
              <van-uploader v-model="identityCardFront"  multiple  :max-count="1"/>
            </template>
        </van-field>
        <van-field required  name="uploader" label="身份证反面">
            <template #input>
              <van-uploader v-model="identityCardReverse"  multiple  :max-count="1"/>
            </template>
        </van-field>
        <van-field  name="uploader" label="个人简历">
          <template #input>
            <van-uploader v-model="resume" accept=".doc,.docx" multiple ></van-uploader>
          </template>
        </van-field>
        <van-field required  name="uploader" label="体检资料">
            <template #input>
              <van-uploader v-model="physicalExamination"  multiple />
            </template>
        </van-field>
        <van-field  name="uploader" label="其它技能">
          <template #input>
            <van-uploader v-model="elseSkill" accept=".doc,.docx" multiple ></van-uploader>
          </template>
        </van-field>
        <van-field  name="uploader" label="离职证明">
            <template #input>
              <van-uploader v-model="dimission"  multiple  :max-count="1"/>
            </template>
        </van-field> -->

        <!-- </van-cell-group> -->
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
import { reactive, onMounted, toRefs, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { staffInfoSave, } from '@/service/home'
import { getLocal } from '@/common/js/utils'
import { Toast } from 'vant'
import { useStore  } from 'vuex'
import { areaList } from '@vant/area-data'
export default {
  name: 'home',
  components: {
  },
  setup() {
    const store = useStore()
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
      show3:false,
      show4:false,
      show5:false,
      show6:false,
      showArea:false,
      showNativePlace:false,
      showNation:false,
      nationList : [
        {
          id: 1,
          text: "汉族",
          value: 1,
        },
        {
          id: 2,
          text: "壮族",
          value: 2,
        },
        {
          id: 3,
          text: "满族",
          value: 3,
        },
        {
          id: 4,
          text: "回族",
          value: 4,
        },
        {
          id: 5,
          text: "苗族",
          value: 5,
        },
        {
          id: 6,
          text: "维吾尔族",
          value: 6,
        },
        {
          id: 7,
          text: "土家族",
          value: 7,
        },
        {
          id: 8,
          text: "彝族",
          value: 8,
        },
        {
          id: 9,
          text: "蒙古族",
          value: 9,
        },
        {
          id: 10,
          text: "藏族",
          value: 10,
        },
        {
          id: 11,
          text: "布依族",
          value: 11,
        },
        {
          id: 12,
          text: "侗族",
          value: 12,
        },
        {
          id: 13,
          text: "瑶族",
          value: 13,
        },
        {
          id: 14,
          text: "朝鲜族",
          value: 14,
        },
        {
          id: 15,
          text: "白族",
          value: 15,
        },
        {
          id: 16,
          text: "哈尼族",
          value: 16,
        },
        {
          id: 17,
          text: "哈萨克族",
          value: 17,
        },
        {
          id: 18,
          text: "黎族",
          value: 18,
        },
        {
          id: 19,
          text: "傣族",
          value: 19,
        },
        {
          id: 20,
          text: "畲族",
          value: 20,
        },
        {
          id: 21,
          text: "傈僳族",
          value: 21,
        },
        {
          id: 22,
          text: "仡佬族",
          value: 22,
        },
        {
          id: 23,
          text: "东乡族",
          value: 23,
        },
        {
          id: 24,
          text: "高山族",
          value: 24,
        },
        {
          id: 25,
          text: "拉祜族",
          value: 25,
        },
        {
          id: 26,
          text: "水族",
          value: 26,
        },
        {
          id: 27,
          text: "佤族",
          value: 27,
        },
        {
          id: 28,
          text: "纳西族",
          value: 28,
        },
        {
          id: 29,
          text: "羌族",
          value: 29,
        },
        {
          id: 30,
          text: "土族",
          value: 30,
        },
        {
          id: 31,
          text: "仫佬族",
          value: 31,
        },
        {
          id: 32,
          text: "锡伯族",
          value: 32,
        },
        {
          id: 33,
          text: "柯尔克孜族",
          value: 33,
        },
        {
          id: 34,
          text: "达斡尔族",
          value: 34,
        },
        {
          id: 35,
          text: "景颇族",
          value: 35,
        },
        {
          id: 36,
          text: "毛南族",
          value: 36,
        },
        {
          id: 37,
          text: "撒拉族",
          value: 37,
        },
        {
          id: 38,
          text: "布朗族",
          value: 38,
        },
        {
          id: 39,
          text: "塔吉克族",
          value: 39,
        },
        {
          id: 40,
          text: "阿昌族",
          value: 40,
        },
        {
          id: 41,
          text: "普米族",
          value: 41,
        },
        {
          id: 42,
          text: "鄂温克族",
          value: 42,
        },
        {
          id: 43,
          text: "怒族",
          value: 43,
        },
        {
          id: 44,
          text: "京族",
          value: 44,
        },
        {
          id: 45,
          text: "基诺族",
          value: 45,
        },
        {
          id: 46,
          text: "德昂族",
          value: 46,
        },
        {
          id: 47,
          text: "保安族",
          value: 47,
        },
        {
          id: 48,
          text: "俄罗斯族",
          value: 48,
        },
        {
          id: 49,
          text: "裕固族",
          value: 49,
        },
        {
          id: 50,
          text: "乌孜别克族",
          value: 50,
        },
        {
          id: 51,
          text: "门巴族",
          value: 51,
        },
        {
          id: 52,
          text: "鄂伦春族",
          value: 52,
        },
        {
          id: 53,
          text: "独龙族",
          value: 53,
        },
        {
          id: 54,
          text: "塔塔尔族",
          value: 54,
        },
        {
          id: 55,
          text: "赫哲族",
          value: 55,
        },
        {
          id: 56,
          text: "珞巴族",
          value: 56,
        },
      ],
      showMarriage:false,
      marriageList:['未婚','已婚','离婚','丧偶'],
      showHouseholdType:false,
      householdTypeList:['农业户口','非农业户口'],
      showEmergencyContact2:false,
      showEmergencyContact3:false,
      emergencyContact2List:['父子','母子','父女','母女','夫妻','之子','之女','兄弟姐妹','祖孙','朋友','同事'],
      emergencyContact4List:['父亲','母亲','夫妻','儿子','女儿','兄弟姐妹',],
      education:'',
      showEducation:false,
      educationList:['博士','研究生','本科','大专','中专/职高/技校','高中/职高','初中','小学','其他'],
      showEducationCertificate:false,
      educationCertificateList:['博士研究生－国外','博士研究生','博士研究生结业','博士研究生肄业','硕士研究生','硕士研究生－国外MBA','硕士研究生－国内MBA','研究生班','硕士研究生结业','硕士研究生肄业','大学本科','第二学士班','大学结业','大学肄业','大专','大专结业','大专肄业','高职毕业','高职结业','高职肄业','中专','中专结业','中专肄业','技校毕业','技校结业','技校肄业','高中','职业高中毕业','农业高中毕业','高中结业','高中肄业','初中','职业初中毕业','农业初中毕业','初中结业','初中肄业','小学','小学结业','小学肄业','无证书'],
      photo:[],
      diploma:[],
      identityCardFront:[],
      identityCardReverse:[],
      resume:[],
      physicalExamination:[],
      elseSkill:[],
      dimission:[],
      showPoliticsStatus:false,
      politicsStatusList:['中共党员','中共预备党员','共青团员','民革党员','民盟盟员','民建会员','民进会员','农工党党员','致公党党员','九三学社社员','台盟盟员','无党派人士','群众',],
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
      studyStyleList:['统招全日制','自考','成人教育','函授','夜校教育','远程教育'],
      workVisible:false,
      workForm: {
          workExperience: [{
              show:false,
              date: '',
          }]
      },
      goAbroadVisible:false,
      goAbroadForm: {
          foreignExperience: [{
              show:false,
              date: '',
          }]
      },
      goAbroadForList:['考察访问','经贸活动','国际会议','进修培训','探亲访友','公费留学','旅游活动','奖励休假','公司福利','其他'],
      costAssumeList:['公司全额承担','个人全额承担','公司和个人比例承担'],
      professionalTitleVisible:false,
      professionalTitleForm: {
          personnelMajor: [{
              show:false,
              date: '',
          }]
      },
      rankList:['初级','中级','高级'],
      trainVisible:false,
      trainForm: {
          trainingExperience: [{
              show:false,
              date: '',
          }]
      },
      healthForm: {showPhysicalCondition:false,},
      physicalConditionList:['健康', '良好', '抱恙'],
      otherForm:{},
      employeeForm:{
        name:'',
        gender:'0',
        mobile:'',
        nation:'',
        politicalOutlook:'',
        maritalStatus:'',
        marriedDate: '',
        nativePlace:'',
        residenceType:'',
        residenceAddr:'',
        childrenNumber:'',
        email:'',
        workTime:'',
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
        relativeEmployment:'',
        relativePersonDepart:'',
        address:'',
        postAddress:'',
      }
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
    const showDatePopup = () => {
      state.show3 = true;
    }
    const onConfirm3 = (value) => {
      state.show3 = false;
      state.employeeForm.marriedDate = formatDate(value);
    }
    const onConfirm4 = (value) => {
      state.show4 = false;
      state.employeeForm.workTime = formatDate(value);
    }
    const onConfirm5 = (value) => {
      state.show5 = false;
      state.employeeForm.idCardExpireDate = formatDate(value);
    }
    const onConfirm6 = (value,index) => {
      state.familyForm.familyRelations[index].show = false;
      state.familyForm.familyRelations[index].birthDate = formatDate(value);
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
    const onConfirm9 = (value,index) => {
      state.workForm.workExperience[index].show = false;
      state.workForm.workExperience[index].startDate = formatDate(value);
    }
    const onConfirm10 = (value,index) => {
      state.workForm.workExperience[index].show2 = false;
      state.workForm.workExperience[index].endDate = formatDate(value);
    }
    const onConfirm11 = (value,index) => {
      state.goAbroadForm.foreignExperience[index].show = false;
      state.goAbroadForm.foreignExperience[index].startDate = formatDate(value);
    }
    const onConfirm12 = (value,index) => {
      state.goAbroadForm.foreignExperience[index].show2 = false;
      state.goAbroadForm.foreignExperience[index].endDate = formatDate(value);
    }
    const onConfirm13 = (value,index) => {
      state.professionalTitleForm.personnelMajor[index].show = false;
      state.professionalTitleForm.personnelMajor[index].assessDate = formatDate(value);
    }
    const onConfirm14 = (value,index) => {
      state.trainForm.trainingExperience[index].show = false;
      state.trainForm.trainingExperience[index].startDate = formatDate(value);
    }
    const onConfirm15 = (value,index) => {
      state.trainForm.trainingExperience[index].show2 = false;
      state.trainForm.trainingExperience[index].endDate = formatDate(value);
    }
    const areaConfirm = (areaValues) => {
      state.showArea = false;
      state.employeeForm.residenceAddr = areaValues
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
    const emergencyContact3Confirm = (value) => {
      state.employeeForm.relativePersonRelation = value;
      state.showEmergencyContact3 = false;
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
    const goAbroadForConfirm = (value,index) => {
      state.goAbroadForm.foreignExperience[index].showGoAbroadFor = false;
      state.goAbroadForm.foreignExperience[index].cause = value;
    };
    const costAssumeConfirm = (value,index) => {
      state.goAbroadForm.foreignExperience[index].showCostAssume = false;
      state.goAbroadForm.foreignExperience[index].bearMode = value;
    };
    const costAssumeConfirm2 = (value,index) => {
      state.trainForm.trainingExperience[index].showCostAssume = false;
      state.trainForm.trainingExperience[index].bearMode = value;
    };
    const rankConfirm = (value,index) => {
      state.professionalTitleForm.personnelMajor[index].showRank = false;
      state.professionalTitleForm.personnelMajor[index].level = value;
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
    const workAdd = ()=>{
      if(!state.workVisible){state.workVisible = true; return;}
      state.workForm.workExperience.push({date:''})
    };
    const workDel = (item)=>{
      const index = state.workForm.workExperience.indexOf(item)
      if (index !== -1) {
          state.workForm.workExperience.splice(index, 1)
      }
    };
    const goAbroadAdd = ()=>{
      if(!state.goAbroadVisible){state.goAbroadVisible = true; return;}
      state.goAbroadForm.foreignExperience.push({date:''})
    };
    const goAbroadDel = (item)=>{
      const index = state.goAbroadForm.foreignExperience.indexOf(item)
      if (index !== -1) {
          state.goAbroadForm.foreignExperience.splice(index, 1)
      }
    };
    const professionalTitleAdd = ()=>{
      if(!state.professionalTitleVisible){state.professionalTitleVisible = true; return;}
      state.professionalTitleForm.personnelMajor.push({date:''})
    };
    const professionalTitleDel = (item)=>{
      const index = state.professionalTitleForm.personnelMajor.indexOf(item)
      if (index !== -1) {
          state.professionalTitleForm.personnelMajor.splice(index, 1)
      }
    };
    const trainAdd = ()=>{
      if(!state.trainVisible){state.trainVisible = true; return;}
      state.trainForm.trainingExperience.push({date:''})
    };
    const trainDel = (item)=>{
      const index = state.trainForm.trainingExperience.indexOf(item)
      if (index !== -1) {
          state.trainForm.trainingExperience.splice(index, 1)
      }
    };
    const physicalConditionConfirm = (value) => {
      state.healthForm.health = value;
      state.healthForm.showPhysicalCondition = false;
    };
    const onSubmit = async () => {
      const { code } = await staffInfoSave({
        ...state.employeeForm,
        ...state.familyForm,
        ...state.educationForm,
        ...state.workForm,
        ...state.goAbroadForm,
        ...state.professionalTitleForm,
        ...state. trainForm,
        ...state. healthForm,
        ...state.otherForm
      })
      // const {code} = await staffInfoSave(
      //  {"realName":"张三","gender":"0","mobile":"15011111113","nation":"汉族","politicalOutlook":"中共党员",
      //   "maritalStatus":"已婚","marriedDate":"2022-09-02","nativePlace":"河南省/郑州市",
      //   "residenceType":"非农业户口","residenceAddr":"广东省/广州市/荔湾区","childrenNumber":"2",
      //   "email":"15011111111@qq.com","workTime":"2022-01-12","idCard":"430426202110079999",
      //   "idCardAddr":"广东省东莞","birthDate":"2021-10-07","issuingAuthority":"东莞",
      //   "idCardStartDate":"2021-07-01","idCardExpireDate":"2022-08-17","emergency":"李大",
      //   "emergencyMobile":"15122222222","emergencyRelation":"母子","relativePerson":"杨大",
      //   "relativeEmployment":"1","relativePersonDepart":"技术部","address":"东莞","postAddress":"深圳",
      //   "relativePersonRelation":"夫妻","recruiter":"刘总",
      //   "familyRelations":[{"relation":"兄弟姐妹","name":"张三","gender":"0","birthDate":"2022-02-03","company":"华为","position":"总监","mobile":"15011111111"}],
      //   "educationalExperience":[{"show":false,"enterDate":"2022-02-02","show2":false,"leaveDate":"2022-02-09","schoolName":"清华","major":"金融","showEducation":false,"education":"博士","showEducationCertificate":false,"educationCertificate":"博士研究生","showStudyStyle":false,"studyStyle":"统招全日制","highestEducation":"1","highestDegree":"1","post":"委员"}],
      //   "workExperience":[{"show":false,"startDate":"2022-01-12","show2":false,"endDate":"2022-02-09","company":"阿里","depart":"技术部","post":"经理","witness":"李大","mobile":"15011111112"}],
      //   "foreignExperience":[{"show":false,"startDate":"2022-02-01","show2":false,"endDate":"2022-02-23","showGoAbroadFor":false,"cause":"考察访问","company":"谷歌","totalCost":"22222","showCostAssume":false,"bearMode":"公司全额承担"}],
      //   "personnelMajor":[{"show":false,"post":"高级工程师","showRank":false,"level":"高级","assessDate":"2022-02-17"}],
      //   "trainingExperience":[{"show":false,"startDate":"2022-01-26","show2":false,"endDate":"2022-02-16","content":"管理","institution":"培训","certificate":"证书","totalCost":"33333","showCostAssume":false,"bearMode":"公司全额承担"}],
      //   "showPhysicalCondition":false,"health":"健康","oneYearSurgicalHistory":"0","majorDiseasesHistory":"0","infectiousDiseases":"0","secrecyAgreement":"0","restrictTime":"0","illegalRecord":"0","majorPenalize":"0"
      //   }
      // )
      
      if(code == '0'){
        Toast.success('保存成功')
      }
      // console.log('submit', values);
    };
    onMounted(async () => {
      const token = getLocal('token')
      if (token) {
        state.isLogin = true
        // 获取购物车数据.
        store.dispatch('updateCart')
      }
      Toast.loading({
        message: '加载中...',
        forbidClick: true
      });
      // const { data } = await getHome()
      // state.swiperList = data.carousels
      // state.newGoodses = data.newGoodses
      // state.hots = data.hotGoodses
      // state.recommends = data.recommendGoodses
      state.loading = false
      Toast.clear()

      
    })

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
      onConfirm3,
      householdTypeConfirm,
      onConfirm4,
      onConfirm5,
      emergencyContact2Confirm,
      emergencyContact3Confirm,
      emergencyContact4Confirm,
      onConfirm6,
      familyAdd,
      familyDel,
      onConfirm7,
      onConfirm8,
      educationAdd,
      educationDel,
      studyStyleConfirm,
      onConfirm9,
      onConfirm10,
      workAdd,
      workDel,
      onConfirm11,
      onConfirm12,
      goAbroadAdd,
      goAbroadDel,
      goAbroadForConfirm,
      costAssumeConfirm,
      costAssumeConfirm2,
      onConfirm13,
      professionalTitleAdd,
      professionalTitleDel,
      rankConfirm,
      onConfirm14,
      onConfirm15,
      trainAdd,
      trainDel,
      physicalConditionConfirm,
      onSubmit,
      showDatePopup,

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