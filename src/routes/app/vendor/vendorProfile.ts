import { Router } from "express";
import getVendorInfoController from "../../../controllers/app/vendor/vendorProfile/getVendorInfo";
import updateVendorInfoController from "../../../controllers/app/vendor/vendorProfile/updateVendorInfo";

const vendorProfileRouter = Router();

vendorProfileRouter.get("/profile/:id", getVendorInfoController);
vendorProfileRouter.put("/update-info/:id", updateVendorInfoController);

export default vendorProfileRouter;