import request from '@/utils/request'

export default {
  //添加小节
  addVideo(data) {
    return request({
      url: '/eduservice/video/addVideo',
      method: 'post',
      data
    })
  },

  //删除小节
  deleteVideo(id) {
    return request({
      url: '/eduservice/video/' + id,
      method: 'delete'
    })
  },
  //删除视频
  deleteAliyunvod(id) {
    return request({
      url: '/eduvod/video/removeAlyVideo/' + id,
      method: 'delete'
    })
  }
}
