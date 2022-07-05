const config = {
  mapboxToken:
    'pk.eyJ1IjoiYXN0cm9zYXQiLCJhIjoiY2o3YWtjNnJzMGR6ajM3b2FidmNwaDNsaSJ9.lwWi7kOiejlT0RbD7RxtmA',
  passwordMaxLength: 255,
  passwordMinLength: 7,
};

const getAppConfig = () => config;

export { getAppConfig };
