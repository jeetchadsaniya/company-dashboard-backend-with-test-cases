const {makeSubProduct} = require("../../entities")

module.exports = function makeCreateSubProductUseCase({ subProductDb, channelDb,productDb,CustomError}) {
    return async function createSubProductUseCase({ productName, description, channelId, productId,companyId } = {}) {
      try {
        //validation
        makeSubProduct({productName, description, productId, channelId , companyId});

        const channel = await channelDb.getChannelByChannelIdAndCompanyId({channelId,companyId});

        if (!channel) {
            throw new CustomError(404,"channel not exists with given channelId in your company");
        }

        const product = await productDb.getProductByProductIdAndCompanyId({productId,companyId});
        if (!product) {
            throw new CustomError(404,"product not exists with given productId in your company")
        }

        let subProduct = await subProductDb.getSubProductByChannelIdAndProductId({channelId,productId});

        if (subProduct) {
            throw new CustomError(400,"sub-product already exists with given productId and channelId")
        }

        subProduct = await subProductDb.getSubProductByProductNameAndCompanyId({productName,companyId});

        if (subProduct) {
            throw new CustomError(400,"same name subProduct exist in your company plz enter other productName");
        }

        const insertedSubProductId = await subProductDb.insertSubProduct({productName, description,productId, channelId,companyId});

        return {subProductId : insertedSubProductId};

      } catch (error) {
        throw new CustomError(error.errorCode, error.message);
      }
    };
  };