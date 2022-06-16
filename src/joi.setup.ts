import BaseJoi from 'joi';
import { fileListExtension } from 'joi-filelist';

const Joi = fileListExtension(BaseJoi);

export default Joi;
