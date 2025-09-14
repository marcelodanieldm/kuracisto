require "test_helper"

class HistoriasClinicasControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get historias_clinicas_index_url
    assert_response :success
  end

  test "should get show" do
    get historias_clinicas_show_url
    assert_response :success
  end

  test "should get new" do
    get historias_clinicas_new_url
    assert_response :success
  end

  test "should get create" do
    get historias_clinicas_create_url
    assert_response :success
  end

  test "should get edit" do
    get historias_clinicas_edit_url
    assert_response :success
  end

  test "should get update" do
    get historias_clinicas_update_url
    assert_response :success
  end

  test "should get destroy" do
    get historias_clinicas_destroy_url
    assert_response :success
  end
end
