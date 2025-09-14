require "test_helper"

class TurnosControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get turnos_index_url
    assert_response :success
  end

  test "should get show" do
    get turnos_show_url
    assert_response :success
  end

  test "should get new" do
    get turnos_new_url
    assert_response :success
  end

  test "should get create" do
    get turnos_create_url
    assert_response :success
  end

  test "should get edit" do
    get turnos_edit_url
    assert_response :success
  end

  test "should get update" do
    get turnos_update_url
    assert_response :success
  end

  test "should get destroy" do
    get turnos_destroy_url
    assert_response :success
  end
end
