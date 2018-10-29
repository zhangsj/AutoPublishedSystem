#_*_ coding:utf-8 _*_
import jenkins
import logging
import sys
import time
from datetime import datetime
#jenkins api token 1155cf7ba0a6ee7e833318293191e6d8a7
reload(sys)
Logger = logging.getLogger('AutoPublishedSystem.custom')

#登陆
server=jenkins.Jenkins('http://192.168.8.211:8080',username='admin',password='admin')
class pyjks:
    #获取视图
    def get_Views(self):
        v_list=[]
        views = server.get_views()
        for i in range(len(views)):
            if views[i]['name'] != 'all':
                v_list.append(views[i]['name'])
        return v_list
    
    def get_MainPro(self,main_name):
        sj_list=[]
        sub_jobs=server.get_jobs(view_name=main_name)
        for i in range(len(sub_jobs)):
           sj_list.append(sub_jobs[i]['name'])
        return sj_list

    def get_jk_info(self):
        jk_li=[]
        v_li=self.get_Views()
        for v in v_li:
            jk_dict={}
            jk_dict['name']=v
            jk_dict['li']=self.get_MainPro(v)
            jk_li.append(jk_dict)
        return jk_li

    #构建
    def deploy_Pro(self,pro_name,dep_env):
        dp_id=server.build_job(pro_name,{'env':dep_env})
        return dp_id
    
    #获取项目配置
    def get_Proconf(self,pro_name):
        result=server.get_job_config('test_a')
        return result
    
    def get_build_total(self):
        all_jobs_li = server.get_all_jobs()
        all_build_num=0
        #for item in all_jobs_li:
        #    all_build_li=server.get_job_info(item['name'])
        #    all_build_num+=len(all_build_li['builds'])
        return len(all_jobs_li),all_build_num
    def get_job_lastinfo(self,job):
        last_build_number = server1.get_job_info(job)['lastCompletedBuild']['number']
        build_info = server1.get_build_info(job,last_build_number)
        bdinfo={}
        bdinfo['bdstatus'] = build_info['building']
        bdinfo['comment'] = build_info['changeSet']['items'][0]['comment']
        bdinfo['email'] = build_info['changeSet']['items'][0]['authorEmail']
        bdinfo['msg'] = build_info['changeSet']['items'][0]['msg']
        bdinfo['date'] = build_info['changeSet']['items'][0]['date']
        return build_info
    def get_job_con(self,job):
        if server.get_job_info(job)['inQueue']:
            build_con_info='任务在队列中，请稍等!'
        else:
            build_number = server.get_job_info(job)['lastBuild']['number']
            build_con_info = server.get_build_console_output(job,build_number)
            build_time = time.strftime("%Y-%m-%d %H:%M:%S",time.localtime(server.get_build_info(job,build_number)['timestamp']/1000))
            build_con_info = build_con_info + '\n' + str(build_time)
        return build_con_info[-800:]
    def get_job_env(self,job):
        env_li=server.get_job_info(job)['actions'][0]['parameterDefinitions'][0]['choices']
        return env_li
     
