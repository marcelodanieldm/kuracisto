require "test_helper"

class MedicosControllerTest < ActionDispatch::IntegrationTest
  test "should get dashboard" do
    get medicos_dashboard_url
    assert_response :success
  end
end
