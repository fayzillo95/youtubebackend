import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';

const swaggerDocument = YAML.load(path.join(process.cwd(), 'src', 'swagger.yaml'));

export default function swaggerDocs(app) {
  app.use('/swaggers', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}
