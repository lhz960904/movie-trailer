export default defineEventHandler(async (event) => {
  return ["mock1", "mock2", "家", "庭"].map((item) => ({ name: item }));
});
