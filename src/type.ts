export type OSSOptions = {
  /**
   * 阿里云上传区域
   */
  region: string
  /**
   * 阿里云的授权accessKeyId
   */
  accessKeyId: string
  /**
   * 阿里云的授权accessKeySecret
   */
  accessKeySecret: string
  /**
   * 上传到哪个bucket
   */
  bucket: string
}

export type OptionalOptions = {
  /**
   * 上传哪些文件，支持类似gulp.src的glob方法，如'./build/**', 为glob字符串
   */
  from: string
  /**
   * 测试，仅查看文件和上传路径，但是不执行上传操作。默认false
   */
  test?: boolean
  /**
   * 是否显示上传日志，默认为true
   */
  verbose?: boolean
  /**
   * 上传到oss哪个目录下，默认为oss根目录。可作为路径前缀使用
   */
  dist?: string
  /**
   * 构建目录名
   */
  buildRoot?: string
  /**
   * 上传完成是否删除原文件，默认false
   */
  deleteOrigin?: boolean
  /**
   * 如果某个目录下的文件都上传过了，是否删除此目录。deleteOrigin为true时候生效。默认false
   */
  deleteEmptyDir?: boolean
  /**
   * oss超时设置，默认为30秒(30000)
   */
  timeout?: number
  /**
   * 自定义每个文件上传路径。接收参数为当前文件路径。不传，或者所传函数返回false则按默认方式上传
   * @param filePath 
   * @returns 
   */
  setOssPath?: (filePath: string) => string
  /**
   * 是否覆盖oss同名文件。默认true
   */
  overwrite?: boolean
  /**
   * 出错是否中断打包。默认false
   */
  quitWpOnError?: boolean
  /**
   * 版本号。默认为''
   */
  version?: string
  /**
   * 设置线上的版本号的方法。一般为axios请求方法，需同时配置version
   * @param data 
   * @returns 
   */
  setVersion?: (data: { version: string }) => void
  /**
   * 上传后要替换的资源文件CDN域名URL
   */
  cdnUrl?: string
  /**
   * 需要上传的文件后缀，默认['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp', 'ico', 'bmp', 'webm', 'avi', 'mp4', 'mp3', 'flv', 'mov']
   */
  fileSuffix?: string[]
}

export type PluginOptions = OSSOptions & OptionalOptions


export const defaultOption = {
  test: false,
  verbose: true,
  dist: '',
  buildRoot: '.',
  deleteOrigin: false,
  deleteEmptyDir: false,
  timeout: 60 * 1000,
  overwrite: true,
  quitWpOnError: false,
} as OptionalOptions