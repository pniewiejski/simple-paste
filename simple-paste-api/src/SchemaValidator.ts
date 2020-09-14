export interface SchemaValidator {
  validate: (data: object) => Promise<boolean>
}
