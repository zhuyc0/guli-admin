import request from '@/utils/request'

export default {
    //1 添加课程信息
    addCourseInfo(courseInfo) {
        return request({
            url: '/eduservice/course/addCourseInfo',
            method: 'post',
            data: courseInfo
        })
    },
    //2 查询所有讲师
    getListTeacher() {
        return request({
            url: '/eduservice/teacher/findAll',
            method: 'get'
        })
    },
    courseList(data) {
        return request({
            url: '/eduservice/course/list',
            method: 'get',
            params: data
        })
    },
    removeCourse: id => request({
        url: `/eduservice/course/remove/${id}`,
        method: 'delete'
    }),
    //根据课程id查询课程基本信息
    getCourseInfoId: id => request({
        url: `/eduservice/course/getCourseInfo/${id}`,
        method: 'get'
    }),
    //修改课程信息
    updateCourseInfo: data => request({
        url: '/eduservice/course/updateCourseInfo',
        method: 'post',
        data
    }),
    //课程确认信息显示
    getPublihCourseInfo(id) {
        return request({
            url: `/eduservice/course/getPublishCourseInfo/${id}`,
            method: 'get'
        })
    },
    //课程最终发布
    publihCourse(id) {
        return request({
            url: `/eduservice/course/publishCourse/${id}`,
            method: 'post'
        })
    },
}
