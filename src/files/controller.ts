// import { JsonController, Post, UploadedFile, BodyParam, Get, Param, Delete } from 'routing-controllers'
// import * as multer from 'multer'
// import Upload from './entity'
// import User from '../users/entity'


// const uploadOptions = {

//   storage: multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, './uploads/')
//     },
//     filename: function (req, file, cb) {
//       cb(null, Date.now() + '_' + file.originalname)
//     },
//   })
// }

// @JsonController()
// export default class UploadController {

//   @Get("/upload")
//   getAll() {
//     return Upload.find();
//   }

//   @Get("/upload/:id")
//   getOne(
//     @Param("id") id: number
//   ) {
//     return Upload.findOne(id);
//   }

//   @Post("/upload")
//   async uploadFile(
//     @UploadedFile("UserFile", { options: uploadOptions }) file: Express.Multer.File,
//     // @CurrentUser
//     @BodyParam("upload") upload: Upload
//   ) {
//     const entity = Upload.create(upload)
//     const usr = await User.findOne(1)
//     const update = {
//       path: file.path,
//       user: usr
//     }
//     return Upload.merge(entity, update).save()
//   }

//   @Delete("/upload/:id")
//   remove(@Param("id") id: number) {
//     return Upload.delete(id);
//   }
// }

