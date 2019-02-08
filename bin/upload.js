const qiniu = require('qiniu')
const glob = require('glob')
const path = require('path')

const files = glob.sync(
  `${path.join(
    __dirname,
    '../dist/**/*.?(js|css|map|png|jpg|svg|woff|woff2|ttf|eot)'
  )}`
)

const config = {
  qiniu: {
    accessKey: 'Fyi53jlcNGI0bGLQHLlkRj1C-MQHvxmvFkDWXN2x',
    secretKey: 'SXniEFH_otO3kQTNk0LRZRubifjDRU4LXO0F7lwe',
    bucket: 'source'
  }
}

const mac = new qiniu.auth.digest.Mac(config.qiniu.accessKey, config.qiniu.secretKey)

async function uploadFileCDN (files) {
  files.map(async file => {
    const pre = path.join(__dirname, '../dist/')
    const key = file.split(pre)[1]
    try {
      await uploadFile(key, file)
      console.log(`上传成功 key: ${key}`)
    } catch (err) {
      console.log('error', err)
    }
  })
}

async function uploadFile (key, file) {
  const putPolicy = new qiniu.rs.PutPolicy({
    scope: config.qiniu.bucket
  })
  const uploadToken = putPolicy.uploadToken(mac)
  const formUploader = new qiniu.form_up.FormUploader(config)
  const putExtra = new qiniu.form_up.PutExtra()
  return new Promise((resolve, reject) => {
    formUploader.putFile(uploadToken, key, file, putExtra, function (
      respErr,
      respBody,
      respInfo
    ) {
      if (respErr) {
        reject(respErr)
      }
      resolve({ respBody, respInfo })
    })
  })
}

(async () => {
  console.time('上传文件到cdn')
  await uploadFileCDN(files)
  console.timeEnd('上传文件到cdn')
})()
